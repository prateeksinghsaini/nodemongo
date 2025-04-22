const express = require("express");
const userRoutes = require("./routes/userRoutes");
const connectDB = require("./config/db");

const app = express();
const PORT = process.env.PORT || 5000;
connectDB();

const middlewareFunction = (req, res, next) => {
  console.log("Middleware ran");
  next();
};

const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};

app.use(logger);
app.use(middlewareFunction);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Hey");
});

app.listen(PORT, () => console.log("Port active on " + PORT));
