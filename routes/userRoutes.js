const express = require("express");
const User = require("../controllers/user");
const { auth } = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hey");
});

router.get("/:id", auth, User.getUser);

router.post("/create-user", User.createUser);

module.exports = router;
