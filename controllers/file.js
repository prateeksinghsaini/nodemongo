const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../files/sample.txt");

const createFile = (req, res) => {
  const content = "Hello, this is a new file!";
  fs.writeFile(filePath, content, (err) => {
    if (err) return res.status(500).send("Error creating file");
    res.send("File created successfully!");
  });
};

const readFile = (req, res) => {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) return res.status(500).send("Error reading file");
    res.send(`File content: ${data}`);
  });
};

const updateFile = (req, res) => {
  const newContent = "Updated content!";
  fs.appendFile(filePath, `\n${newContent}`, (err) => {
    if (err) return res.status(500).send("Error updating file");
    res.send("File updated successfully!");
  });
};

const deleteFile = (req, res) => {
  fs.unlink(filePath, (err) => {
    if (err) return res.status(500).send("Error deleting file");
    res.send("File deleted successfully!");
  });
};

module.exports = { createFile, readFile, updateFile, deleteFile };
