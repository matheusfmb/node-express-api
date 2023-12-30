const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");

const authMiddleware = async (req, res, next) => {
    try {
        const secretKey = process.env.SECRET_KEY_JWT;

        const rawToken = req.header("Authorization");
        const token = rawToken.replace(/Bearer\s+/gi, "");

        const decoded = jwt.verify(token, secretKey);

        const email = decoded.email;
        const user = await UserModel.findOne({ email: email });
        if (!user) {
            console.log("Usuário não encontrado");
            throw new Error("Usuário não encontrado");
        }

        req.user = user;
        req.token = token;

        next();
    } catch (error) {
        console.error("Erro durante a autenticação:", error.message);
        res.status(401).json({ error: "Token inválido" });
    }
};


module.exports = authMiddleware;
