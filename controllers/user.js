const User = require("../modals/user");

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.render("user", { user });
  } catch {
    res.status(500).send(err);
  }
};

const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  const newUser = new User({ name, email, password });

  try {
    await newUser.save();
    res.redirect("/users");
  } catch (err) {
    res.status(400).send(err);
  }
};

module.exports = { getUser, createUser };
