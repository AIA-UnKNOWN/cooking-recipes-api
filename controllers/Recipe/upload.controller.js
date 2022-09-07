const { getFileBasePathByMimeType } = require('@middlewares/FileUpload/helpers');
const { Upload } = require('@models');

module.exports = async (req, res) => {
  try {
    const { filename, mimetype } = req.file;
    const filePath = `${getFileBasePathByMimeType(mimetype)}/${filename}`;
    const uploadedFile = await Upload.create({
      file_path: filePath,
      type: mimetype,
    });
    res.status(200).json({
      message: 'created recipe video',
      uploadedFile,
    });
  } catch(error) {
    res.status(500).json({
      message: error.message,
    });
  }
}