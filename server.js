require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const path = require("path");

const app = express();

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database!");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

app.use(express.json());
// set view engine
app.set("views", "./views");
app.set("view engine", "ejs");

// server static file
app.use("/public", express.static(path.join(__dirname, "public")));

// router

app.use("/upload", require("./server/routers/upload"));
app.use(require("./server/routers/home"));
