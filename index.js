const dotenv = require('dotenv');
const express = require("express");
const connectToDB = require("./src/database/connect");
const port = 8080;
const app = express();

dotenv.config()
connectToDB()

const userRoutes = require("./src/routes/userRoutes");
const auth = require("./src/routes/auth");

app.use(express.json());
app.use("/api", userRoutes); 
app.use("/api", auth); 


app.listen(port, () => console.log(`Server Rodando na porta ${port}!`));