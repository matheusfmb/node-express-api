// connectToDB.js
const mongoose = require("mongoose");

const connectToDB = async () => {
    try {
        await mongoose.connect(
            `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@cluster0.de3aqwr.mongodb.net/?retryWrites=true&w=majority`);
        console.log("Conexão Realizada com sucesso!");
    } catch (error) {
        console.error("Erro ao conectar ao banco de dados:", error.message);
    }
};

module.exports = connectToDB;
