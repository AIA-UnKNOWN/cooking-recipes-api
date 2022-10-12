const multer = require('multer');
const path = require('path');

const { getFileBasePathByMimeType } = require('@middlewares/FileUpload/helpers');

const upload = fileType => {
  const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, `../../storage/${fileType || getFileBasePathByMimeType(file.mimetype)}`));
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });
  return multer({ storage: fileStorageEngine });
}

module.exports = upload;