const express = require("express");
const userDTO = require("../models/userDTO")
const UserModel = require("../models/user.model");
const router = express.Router();

router.post("/users", async (req, res) => {
    try {
        const user = await UserModel.create(req.body)
        const userDto = userDTO(user)
        return res.status(201).send(userDto)
    }catch (error){
        return res.status(500).send(error.message);
    }
});

router.get("/users", async (req, res) =>{
    try{
        const users = await UserModel.find({});
        const usersDto = users.map(userDTO)
        return res.status(200).send(usersDto)
    }catch (error){
        return res.status(500).send(error.message)
    }
});

router.get('/users/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const user = await UserModel.findById(id);
        if (!user) {
            return res.status(404).send("Usuário não encontrado");
        }
        const userDto = userDTO(user)
        return res.status(200).send(userDto);
    } catch (error) {
        return res.status(500).send(error.message);
    }
});

module.exports = router;