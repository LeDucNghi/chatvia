const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { v4: uuidv4 } = require("uuid");

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, `${uuidv4()} `);
  },
});

const upload = multer({ storage: storage }).single("image");

const multerMiddleware = (req, res, next) => {
  const multerSingle = upload;

  multerSingle(req, res, function (err) {
    if (err) {
      // Handle Multer or file upload errors here
      return res.status(500).json({ error: err.message });
    }
    // Proceed to the next middleware or controller logic if no error
    next();
  });
};

module.exports = {
  upload,
  multerMiddleware,
};
