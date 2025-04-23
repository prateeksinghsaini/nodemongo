const express = require("express");
const User = require("../controllers/user");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hey");
});

router.get("/:id", User.getUser);

router.post("/create-user", User.createUser);

module.exports = router;
