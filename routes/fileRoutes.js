const express = require("express");
const router = express.Router();
const file = require("../controllers/file");
const stream = require("../controllers/stream");

router.get("/create-file", file.createFile);
router.get("/read-file", file.readFile);
router.get("/update-file", file.updateFile);
router.get("/delete-file", file.deleteFile);
router.get("/copy-stream-file", stream.copyFileStream);

module.exports = router;
