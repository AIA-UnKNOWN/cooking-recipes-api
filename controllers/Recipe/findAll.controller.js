const sequelize = require('sequelize');
const { Recipe, Upload } = require('@models');
const paginate = require('@helpers/paginate');

module.exports = async (req, res) => {
  const { userId } = req.params;

  const pagination = paginate(req.body);
  try {
    const condition = {
      where: {
        user_id: userId,
      },
      include: {
        model: Upload,
      },
      order: [
        ['id', 'DESC'],
      ],
      offset: pagination.offset || undefined,
      limit: pagination.limit || undefined,
    }
    const recipes = await Recipe.findAll(condition);
    const recipesCount = recipes?.map(recipe => recipe.dataValues)?.length || 0;
    res.status(200).json({
      message: 'Successfully retrieved a recipe',
      meta: {
        ...pagination.meta || {},
        prevOffset: pagination.prevOffset > 0 ? pagination.prevOffset : undefined,
        prevLimit: pagination.prevLimit > 0 ? pagination.prevLimit : undefined,
      },
      data: recipes,
    });
  } catch(error) {
    res.status(500).json({
      error: error.message || 'An error occured while finding all recipes'
    });
  }
}