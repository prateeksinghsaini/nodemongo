const User = require("../modals/user");

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(201).json({
      status: "success",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch {
    res.status(500).send(err);
  }
};

const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  const newUser = new User({ name, email, password });

  try {
    const result = await newUser.save();
    res.status(201).json({
      status: "success",
      user: {
        id: result._id,
        name: result.name,
        email: result.email,
      },
    });
  } catch (err) {
    res.status(400).send(err);
  }
};

module.exports = { getUser, createUser };
