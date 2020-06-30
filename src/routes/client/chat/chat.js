const express = require("express");
const router = express.Router();
const io = require("socket.io");

//user chat
router.get("/", (req, res) => res.render("chat"));

module.exports = router;
