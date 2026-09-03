const Task = require("../models/Task");

// GET /api/tasks?status=all|active|completed&priority=low|medium|high&q=search
async function getTasks(req, res, next) {
  try {
    const { status, priority, q } = req.query;
    const filter = {};

    if (status === "active") filter.completed = false;
    if (status === "completed") filter.completed = true;
    if (priority && ["low", "medium", "high"].includes(priority)) {
      filter.priority = priority;
    }
    if (q) {
      filter.title = { $regex: q, $options: "i" };
    }

    const tasks = await Task.find(filter).sort({ completed: 1, dueDate: 1, createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    next(err);
  }
}

// GET /api/tasks/:id
async function getTaskById(req, res, next) {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (err) {
    next(err);
  }
}

// POST /api/tasks
async function createTask(req, res, next) {
  try {
    const { title, notes, priority, dueDate } = req.body;
    const task = await Task.create({ title, notes, priority, dueDate });
    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
}

// PUT /api/tasks/:id
async function updateTask(req, res, next) {
  try {
    const { title, notes, priority, dueDate, completed } = req.body;
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    if (title !== undefined) task.title = title;
    if (notes !== undefined) task.notes = notes;
    if (priority !== undefined) task.priority = priority;
    if (dueDate !== undefined) task.dueDate = dueDate;
    if (completed !== undefined) task.completed = completed;

    await task.save();
    res.json(task);
  } catch (err) {
    next(err);
  }
}

// PATCH /api/tasks/:id/toggle
async function toggleTask(req, res, next) {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    task.completed = !task.completed;
    await task.save();
    res.json(task);
  } catch (err) {
    next(err);
  }
}

// DELETE /api/tasks/:id
async function deleteTask(req, res, next) {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json({ message: "Task deleted", id: req.params.id });
  } catch (err) {
    next(err);
  }
}

// GET /api/tasks/stats/summary
async function getStats(req, res, next) {
  try {
    const [total, completed, active, highPriorityActive] = await Promise.all([
      Task.countDocuments({}),
      Task.countDocuments({ completed: true }),
      Task.countDocuments({ completed: false }),
      Task.countDocuments({ completed: false, priority: "high" }),
    ]);
    res.json({ total, completed, active, highPriorityActive });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  toggleTask,
  deleteTask,
  getStats,
};
