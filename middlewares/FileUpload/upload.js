const multer = require('multer');
const path = require('path');

const upload = fileType => {
  let fileDestination = '';
  switch(fileType) {
    case 'videos':
      fileDestination = 'videos';
      break;
    case 'images':
    default:
      fileDestination = 'images'
  }
  const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, '..', '..', 'storage', fileDestination));
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });
  const upload = multer({ storage: fileStorageEngine });
  return upload;
}

module.exports = upload;