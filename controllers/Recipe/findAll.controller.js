const { Recipe, Upload } = require('@models');

module.exports = async (req, res) => {
  const { userId } = req.params;

  const { offset, limit, recordsPerPage, meta } = paginate(req.body);

  try {
    const recipes = await Recipe.findAll({
      user_id: userId,
      include: {
        model: Upload,
      },
      order: [
        ['id', 'DESC'],
      ],
      offset,
      limit,
    });
    const recipesCount = recipes.map(recipe => recipe.dataValues).length;
    res.status(200).json({
      message: 'Successfully retrieved a recipe',
      meta: {
        ...meta,
        nextOffset: recipesCount < recordsPerPage ? undefined : meta.nextOffset,
        nextLimit: recipesCount < recordsPerPage ? undefined : meta.nextLimit,
      },
      data: recipes,
    });
  } catch(error) {
    res.status(500).json({
      error: error.message || 'An error occured while finding all recipes'
    });
  }
}

const paginate = body => {
  const { pagination } = body || {};
  let offset = pagination.offset || 0;
  let limit = pagination.limit || 5;
  const recordsPerPage = pagination.limit - pagination.offset;
  const prevOffset = pagination.offset - recordsPerPage;
  const prevLimit = pagination.limit - recordsPerPage;
  let meta = {
    nextOffset: pagination.offset + recordsPerPage,
    nextLimit: pagination.limit + recordsPerPage,
    prevOffset: prevOffset > 0 ? prevOffset : undefined,
    prevLimit: prevLimit > 0 ? prevLimit : undefined,
  };

  return { offset, limit, recordsPerPage, meta };
}