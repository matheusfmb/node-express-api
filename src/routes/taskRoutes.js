const express = require("express");
const TaskModel = require("../models/task.model");
const authMiddleware = require("../auth/authMiddleware")
const router = express.Router();


// Rota para cadastrar uma nova tarefa
router.post("/tasks", async (req, res) => {
  try {
    const { title, description, CreationDate, status, userId } = req.body;
    const newTask = await TaskModel.create({
      title,
      description,
      CreationDate,
      status,
      user: userId, 
    });

    res.status(201).json(newTask); 
    } catch (error) {
    console.error(error);
    res.status(500).json(error.message);
  }
});


router.get("/tasks/:userId", async (req, res) =>{
    try{
        const userId = req.params.userId;
        const tasks = await TaskModel.find({ user: userId });
        return res.status(200).json(tasks);
    }catch (error){
        return res.status(500).send(error.message)
    }
});


module.exports = router;
