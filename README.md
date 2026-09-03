# Ledger — Full-Stack Task Manager

A task manager built with **React (Vite)** on the frontend, **Express + Mongoose** on the backend, and **MongoDB** for storage.

## Features

- Create, edit (double-click a title), complete, and delete tasks
- Priority levels (low / medium / high) with visual left-border color coding
- Optional due dates, with overdue tasks flagged in red
- Filter by status (all / active / completed) and priority, plus live search
- Live stats bar (open, done, urgent) backed by a `/stats/summary` endpoint
- Optimistic UI updates for toggling and deleting tasks

## Project structure

```
task-manager/
├── backend/
│   ├── config/db.js              MongoDB connection
│   ├── models/Task.js            Mongoose schema
│   ├── controllers/taskController.js
│   ├── routes/taskRoutes.js
│   ├── middleware/errorHandler.js
│   ├── server.js                 Express app entry point
│   ├── package.json
│   └── .env.example
└── frontend/
    ├── src/
    │   ├── api/tasks.js          fetch() wrappers for the API
    │   ├── components/           Header, TaskForm, FilterBar, TaskList, TaskItem
    │   ├── App.jsx / App.css
    │   ├── index.css
    │   └── main.jsx
    ├── index.html
    ├── vite.config.js            dev server + /api proxy to :5000
    └── package.json
```

## Prerequisites

- Node.js 18+
- A MongoDB instance — either local (`mongodb://127.0.0.1:27017`) or a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster

## 1. Backend setup

```bash
cd backend
npm install
cp .env.example .env      # then edit .env with your MongoDB URI if needed
npm run dev                # starts on http://localhost:5000
```

`.env` variables:

| Variable        | Description                              | Default                                    |
|-----------------|-------------------------------------------|---------------------------------------------|
| `PORT`          | API port                                  | `5000`                                       |
| `MONGODB_URI`   | Mongo connection string                   | `mongodb://127.0.0.1:27017/task_manager`     |
| `CLIENT_ORIGIN` | Allowed CORS origin (the frontend's URL)  | `http://localhost:5173`                      |

## 2. Frontend setup

In a second terminal:

```bash
cd frontend
npm install
npm run dev                # starts on http://localhost:5173
```

The Vite dev server proxies any request to `/api/*` through to `http://localhost:5000`, so the frontend never needs to know the backend's absolute URL. Open **http://localhost:5173** in your browser.

## API reference

| Method | Endpoint                  | Description                        |
|--------|----------------------------|-------------------------------------|
| GET    | `/api/tasks`               | List tasks (`?status=&priority=&q=`)|
| GET    | `/api/tasks/:id`           | Get a single task                   |
| POST   | `/api/tasks`                | Create a task                       |
| PUT    | `/api/tasks/:id`            | Update a task                       |
| PATCH  | `/api/tasks/:id/toggle`     | Toggle completed status             |
| DELETE | `/api/tasks/:id`            | Delete a task                       |
| GET    | `/api/tasks/stats/summary`  | Counts for the header stats bar     |

## Production build

```bash
cd frontend
npm run build     # outputs static files to frontend/dist
```

Serve `frontend/dist` with any static host (Netlify, Vercel, nginx, or Express's `express.static`), and point it at your deployed backend by updating the API base URL in `src/api/tasks.js` or by setting up a reverse proxy.

## Next steps you could add

- User accounts (JWT auth) so tasks are scoped per user
- Drag-and-drop reordering
- Recurring tasks / reminders
- Dockerfile + docker-compose for one-command startup
