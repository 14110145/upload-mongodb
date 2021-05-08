require("dotenv").config();
const express = require("express");
const hbs = require("express-handlebars");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

// server static file
app.use(express.static(path.join(__dirname, "public")));

// set view engine
app.set("view engine");

app.use("/", (req, res) => {
  res.status(200).json({ msg: "Run app successfully!" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
