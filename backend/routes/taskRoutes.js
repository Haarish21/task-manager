const express = require("express");
const {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  toggleTask,
  deleteTask,
  getStats,
} = require("../controllers/taskController");

const router = express.Router();

router.get("/stats/summary", getStats);

router.route("/").get(getTasks).post(createTask);

router
  .route("/:id")
  .get(getTaskById)
  .put(updateTask)
  .delete(deleteTask);

router.patch("/:id/toggle", toggleTask);

module.exports = router;
