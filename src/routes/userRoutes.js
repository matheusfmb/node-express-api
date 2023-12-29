const express = require("express");
const router = express.Router();

router.get("/users", (req, res) => {
    const users = [
        {
            id: 1,
            username: "usuario1",
            email: "usuario1@example.com"
        },
        {
            id: 2,
            username: "usuario2",
            email: "usuario2@example.com"
        }];
    res.status(200).send(users);
});

module.exports = router;