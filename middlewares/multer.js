const multer = require("multer");
const path = require("path");

// File upload middleware
const storage = multer.diskStorage({
    destination: path.join(__dirname, "../public/img/films"), 
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
    },
});

const upload = multer({ storage });

module.exports = upload;