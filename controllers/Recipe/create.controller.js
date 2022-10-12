const { Recipe, Upload } = require('@models');
const { getFileBasePathByMimeType } = require('@middlewares/FileUpload/helpers');

module.exports = async (req, res) => {
  try {
    const { name, description, userId } = req.body || {};
    const newlyCreatedRecipe = await Recipe.create({
      name,
      description: description || null,
      user_id: userId,
    });
    await storeUploadedFiles(req.files, newlyCreatedRecipe.id);
    res.status(201).json({
      message: 'Successfully created a recipe',
      data: newlyCreatedRecipe,
    });
  } catch(error) {
    res.status(500).json({
      error: error.message || 'An error occured while creating a recipe'
    });
  }
}

const storeUploadedFiles = async (files, recipeId) => {
  return new Promise((resolve, reject) => {
    if (Object.keys(files).length > 0) {
      const uploadedFiles = [];
      Object.keys(files).forEach(async fieldName => {
        const uploadedFile = await uploadFile({
          file: files?.[fieldName]?.[0],
          recipeId,
        });
      });
      resolve({ uploads: uploadedFiles });
    } else {
      reject({ uploads: [] });
    }
  });
}

const uploadFile = async ({ file, recipeId }) => {
  const { filename, mimetype } = file;
  const filePath = `${getFileBasePathByMimeType(mimetype)}/${filename}`;
  const uploadedFile = await Upload.create({
    file_path: filePath,
    type: mimetype,
    recipe_id: recipeId,
  });
  return uploadedFile;
}