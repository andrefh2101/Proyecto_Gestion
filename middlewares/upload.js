const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1E9);
    cb(null, `${unique}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage });
