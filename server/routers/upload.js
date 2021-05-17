const express = require("express");
const route = express.Router();
const upload = require("../middlewares/multer");
const { uploadCtr } = require("../controllers/upload.controller");

route.post("/uploadmultiple", upload.array("images"), uploadCtr);

module.exports = route;
