const express = require("express");
const UserModel = require("../models/user.model")
const router = express.Router();

router.post("/users", async (req, res) => {
    try {
        const user = await UserModel.create(req.body)
        res.status(201).send(user)
    }catch (error){
        res.status(500).send(error.message);
    }
});

router.get("/users", (req, res) =>{
    res.status(201).send("Olá")
});


module.exports = router;