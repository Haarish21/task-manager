const BASE_URL = "/api/tasks";

async function handleResponse(res) {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || "Something went wrong");
  }
  return data;
}

export async function fetchTasks({ status = "all", priority = "", q = "" } = {}) {
  const params = new URLSearchParams();
  if (status && status !== "all") params.set("status", status);
  if (priority) params.set("priority", priority);
  if (q) params.set("q", q);

  const res = await fetch(`${BASE_URL}?${params.toString()}`);
  return handleResponse(res);
}

export async function fetchStats() {
  const res = await fetch(`${BASE_URL}/stats/summary`);
  return handleResponse(res);
}

export async function createTask(payload) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
}

export async function updateTask(id, payload) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
}

export async function toggleTask(id) {
  const res = await fetch(`${BASE_URL}/${id}/toggle`, { method: "PATCH" });
  return handleResponse(res);
}

export async function deleteTask(id) {
  const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
  return handleResponse(res);
}
