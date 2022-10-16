const sequelize = require('sequelize');
const { Op } = sequelize;
const { Recipe, Upload } = require('@models');
const paginate = require('@helpers/paginate');

module.exports = async (req, res) => {
  const { userId } = req.params;
  const { searchKey } = req.body;
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
    if (searchKey) {
      condition.where = {
        [Op.or]: [
          { name: { [Op.like]: `%${searchKey}%` } },
          { description: { [Op.like]: `%${searchKey}%` } },
        ],
        ...condition.where,
      }
    }
    const recipes = await Recipe.findAll(condition);
    res.status(200).json({
      message: 'Successfully retrieved a recipe',
      meta: {
        ...pagination.meta || {},
        currentOffset: pagination?.offset || undefined,
        limit: pagination?.limit || undefined,
      },
      data: recipes,
    });
  } catch(error) {
    res.status(500).json({
      error: error.message || 'An error occured while finding all recipes'
    });
  }
}