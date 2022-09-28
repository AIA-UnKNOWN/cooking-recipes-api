const { Recipe } = require('@models');

module.exports = async (req, res) => {
  const { userId } = req.params;
  
  try {
    const recipes = await Recipe.findAll({
      user_id: userId,
    });
    res.status(200).json({
      message: 'Successfully retrieved a recipe',
      data: recipes,
    });
  } catch(error) {
    res.status(500).json({
      error: error.message || 'An error occured while finding all recipes'
    });
  }
}