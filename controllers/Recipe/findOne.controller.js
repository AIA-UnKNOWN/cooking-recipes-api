const { Recipe, Upload } = require('@models');

module.exports = async (req, res) => {
  try {
    const recipe = await Recipe.findOne({
      where: {
        id: req.params.recipeId
      }
    });
    const files = await Upload.findAll({
      where: {
        recipe_id: recipe.id,
      }
    });
    res.status(200).json({
      message: 'Successfully retrieved a recipe',
      data: recipe,
      files,
    });
  } catch(error) {
    res.status(500).json({
      error: error.message || 'An error occured while finding a recipe'
    });
  }
}