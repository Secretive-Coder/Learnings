import Task from "../models/taskModel.js";

// CREATE A NEW TASK
export const createTask = async (req: any, res: any) => {
  try {
    const { title, description, priority, dueDate, completed } = req.body;
    const task = new Task({
      title,
      description,
      priority,
      dueDate,
      completed: completed === "Yes" || completed === "true",
      owner: req.user.id,
    });

    const saved = await task.save();
    res.status(201).json({
      success: true,
      task: saved,
    });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// GET ALL TASKS
export const getAllTasks = async (req: any, res: any) => {
  try {
    const tasks = await Task.find({ owner: req.user.id }).sort({
      createdAt: -1,
    });
    res.status(200).json({
      success: true,
      tasks,
    });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// GET A SINGLE TASK
export const getTaskById = async (req: any, res: any) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, owner: req.user.id });
    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }
    res.status(200).json({
      success: true,
      task,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// UPDATE A TASK
export const updateTask = async (req: any, res: any) => {
  try {
    const data = { ...req.body };
    if (data.completed !== undefined) {
      data.completed = data.completed === "Yes" || data.completed === "true";
    }

    const updated = await Task.findOneAndUpdate(
      { _id: req.params.id, owner: req.user.id },
      data,
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }
    res.status(200).json({
      success: true,
      task: updated,
    });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// DELETE A TASK
export const deleteTask = async (req: any, res: any) => {
  try {
    const deleted = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user.id,
    });

    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }
    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};
