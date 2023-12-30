const express = require("express");
const TaskModel = require("../models/task.model");
const authMiddleware = require("../auth/authMiddleware")
const router = express.Router();


//CREATE A TASK
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
    res.status(500).json({error: error.message});
  }
});

//GET TASKS BY UserID.
router.get("/tasks/:userId", async (req, res) =>{
    try{
        const userId = req.params.userId;
        const tasks = await TaskModel.find({ user: userId });
        return res.status(200).json(tasks);
    }catch (error){
        return res.status(500).send({error: error.message})
    }
});

//DELETE TASK By ID
router.delete("/tasks/:taskId" , async (req, res) =>{
  try{
    const taskId = req.params.taskId;
    const task = await TaskModel.findById(taskId)
    if(!task){
      return res.status(404).send("Tarefa não encontrado");
    }else{
      const taskToDelete = await TaskModel.findByIdAndDelete(taskId)
      res.status(204).send("Tarefa Deletada com Sucesso")
    }
  }catch(error){
    return res.status(500).send({error: error.message})
  }
});

//UPDATE A TASK By Id.
router.patch("/tasks/:taskId", async (req, res) => {
  const taskId = req.params.taskId;
  const updates = req.body;
  try {
    const updatedTask = await TaskModel.findByIdAndUpdate(taskId, updates, { new: true });

    if (!updatedTask) {
      return res.status(404).send({error: error.message});
    }else{
      return res.status(200).send(updatedTask);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({error: error.message});
  }
});


module.exports = router;
