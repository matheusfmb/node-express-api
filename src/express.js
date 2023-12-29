const express = require("express");
const port = 8080;
const app = express()

app.get("/home", (req, res) => {
    res.status(200).send("Olá")
});

app.listen(port, () => console.log(`Server Rodando na porta ${port}!`));