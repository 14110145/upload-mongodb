const Uploads = require("../models/upload.model");
const fs = require("fs");

exports.uploadCtr = (req, res, next) => {
  const files = req.files;
  if (!files) {
    const error = new Error("Please choose files!");
    error.httpStatusCode = 400;

    return next(error);
  }

  let imgArray = files.map((file) => {
    let img = fs.readFileSync(file.path);
    return (endcode_image = img.toString("base64"));
  });

  let result = imgArray.map(async (src, index) => {
    let finalImg = {
      fileName: files[index].originalname,
      contentType: files[index].mimetype,
      imagesBase64: src,
    };

    const newUploads = new Uploads(finalImg);

    return await newUploads
      .save()
      .then(() => {
        return { msg: `${files[index].originalname} Upload Successfully...!` };
      })
      .catch((error) => {
        if (error.name === "MongoError" && error.code === 11000) {
          return Promise.reject({ error: `Duplicate ${files[index].originalname}. File Already exists!` });
        }
        return Promise.reject({ error: error.message || `Cant upload ${files[index].originalname} file.` });
      });
  });

  Promise.all(result)
    .then((msg) => {
      return res.status(200).json({ msg });
    })
    .catch((error) => {
      return res.status(400).json(error);
    });
};
