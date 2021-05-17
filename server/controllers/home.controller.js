const Uploads = require("../models/upload.model");

exports.home = async (req, res) => {
  const allImages = await Uploads.find();
  return res.render("home.ejs", { allImages });
};
