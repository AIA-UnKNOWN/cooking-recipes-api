const { Recipe } = require('@models');

module.exports = async (req, res) => {
  try {
    const { recipeId } = req.params;

    const isRecipeUpdated = await Recipe.update(req.body, {
      where: { id: recipeId }
    });
    const recipe = await Recipe.findOne({
      where: { id: recipeId }
    });

    res.status(201).json({
      data: recipe,
      message: 'Successfully updated a recipe',
      isUpdated: Boolean(isRecipeUpdated[0]),
    });
  } catch(error) {
    res.status(500).json({
      message: error.message,
    });
  }
}