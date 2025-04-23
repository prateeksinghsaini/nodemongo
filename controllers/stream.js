const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "../files/example.txt");

const streamFile = (req, res) => {
  const readStream = fs.createReadStream(filePath, "utf8");

  readStream.on("error", (err) => {
    return res.status(500).send("Error reading the file.");
  });

  res.setHeader("Content-Type", "text/plain");

  readStream.pipe(res);
};

const copyFileStream = (req, res) => {
  const sourcePath = path.join(__dirname, "../files/example.txt");
  const destPath = path.join(__dirname, "../files/copied.txt");

  const readStream = fs.createReadStream(sourcePath);
  const writeStream = fs.createWriteStream(destPath);

  readStream.pipe(writeStream);

  writeStream.on("finish", () => {
    res.send("File copied successfully using streams!");
  });

  readStream.on("error", () => res.status(500).send("Error reading file."));
  writeStream.on("error", () => res.status(500).send("Error writing file."));
};

module.exports = { streamFile, copyFileStream };
