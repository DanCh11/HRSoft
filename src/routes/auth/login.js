const express = require("express");
const router = express.Router();
const passport = require("passport");

//Login page
router.get("/", (req, res) => res.render("login"));

// Login handler
router.post("/", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/login",
    //failureFlash: true
  })(req, res, next);
});

module.exports = router;
