const { Recipe } = require('@models');
const { Upload } = require('@models');
const { getFileBasePathByMimeType } = require('@middlewares/FileUpload/helpers');

module.exports = async (req, res) => {
  try {
    const { name, description, userId } = req.body || {};
    const newlyCreatedRecipe = await Recipe.create({
      name,
      description: description || null,
      user_id: userId,
    });
    let uploadedFile = null;
    if (req.file) {
      uploadedFile = await uploadFile({
        file: req.file,
        recipeId: newlyCreatedRecipe.id,
      });
    }
    res.status(201).json({
      message: 'Successfully created a recipe',
      data: newlyCreatedRecipe,
      file: uploadedFile || null,
    });
  } catch(error) {
    res.status(500).json({
      error: error.message || 'An error occured while creating a recipe'
    });
  }
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