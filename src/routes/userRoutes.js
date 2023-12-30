const express = require("express");
const userDTO = require("../models/userDTO")
const UserModel = require("../models/user.model");
const authMiddleware = require("../auth/authMiddleware")
const router = express.Router();


//CREATE AN USER
router.post("/users", async (req, res) => {
    try {
        const user = await UserModel.create(req.body)
        const userDto = userDTO(user)
        return res.status(201).send(userDto)
    }catch (error){
        return res.status(500).send(error.message);
    }
});


//FIND ALL USERS.
router.get("/users", authMiddleware, async (req, res) =>{
    try{
        const users = await UserModel.find({});
        if(users.length === 0){
            return res.status(200).send("Não Existem Usuários Cadastrados")
        }
        const usersDto = users.map(userDTO)
        return res.status(200).send(usersDto)
    }catch (error){
        return res.status(500).send(error.message)
    }
});

//FIND AN USER BY ID.
router.get('/users/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const user = await UserModel.findById(id);
        if (!user) {
            return res.status(404).send("Usuário não encontrado");
        }else{
            const userDto = userDTO(user)
            return res.status(200).send(userDto);
        }
    } catch (error) {
        return res.status(500).send(error.message);
    }
});

//DELETE AN USER BY ID
router.delete('/users/:id', async (req, res) => {
    try {
       const id = req.params.id
       const user = await UserModel.findById(id)
       if (!user) {
        return res.status(404).send("Usuário não encontrado");
        }else{
            const userToDelete = await UserModel.findByIdAndDelete(id)
            res.status(204).send(user)
        }
    } catch (error) {
        return res.status(500).send(error.message);
    }
});




module.exports = router;