const express = require("express");
const port = 8080;
const app = express();

const userRoutes = require("./src/routes/userRoutes");
app.use("/api", userRoutes); 
app.listen(port, () => console.log(`Server Rodando na porta ${port}!`));