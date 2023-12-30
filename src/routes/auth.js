// routes/userRoutes.js
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");
const userDTO = require("../models/userDTO")
const router = express.Router();

router.post("/login", async (req, res) => {
    try {
        const secretKey = process.env.SECRET_KEY_JWT
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: "Credenciais inválidas" });
        }
        const token = jwt.sign({email: email}, secretKey);
        const userDto = userDTO(user)
        res.header("Authorization", `Bearer ${token}`);
        res.status(200).json({userDto, token});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
