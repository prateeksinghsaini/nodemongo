const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../modals/user");

const createToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT, {
    expiresIn: "1h",
  });
};

const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({
        message: "User already exists",
        status: "failed",
      });

    const user = new User({ name, email, password });
    await user.save();

    const token = createToken(user);
    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      message: "User created successfully",
      status: "success",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Something went wrong",
      error: err.message,
      status: "failed",
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({
        message: "Invalid email",
        status: "failed",
      });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.status(200).json({
        message: "Invalid password",
        status: "failed",
      });

    const token = createToken(user);
    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: email,
      },
      message: "Logged in successfully",
      status: "success",
    });
  } catch (err) {
    res.status(500).json({
      message: "Login failed",
      error: err.message,
      status: "failed",
    });
  }
};

module.exports = { signup, login };
