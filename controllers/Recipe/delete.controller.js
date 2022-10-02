const { Recipe } = require('@models');

module.exports = async (req, res) => {
  try {
    const recipe = await Recipe.destroy({
      where: {
        id: req.params.recipeId,
      },
    });
    res.status(200).json({
      message: 'successfully deleted a recipe',
      data: recipe,
    });
  } catch(error) {
    res.status(500).json({
      message: error.message || 'An error occured while deleting a recipe',
    });
  }
}