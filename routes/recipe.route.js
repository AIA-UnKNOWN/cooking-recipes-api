const router = require('express').Router();

const { upload } = require('@middlewares/FileUpload');
const Recipe = require('@controllers/Recipe');

router
  .post(
    '/create',
    upload().fields([
      { name: 'recipe-thumbnail', maxCount: 1 },
      { name: 'recipe-video', maxCount: 1 },
    ]),
    Recipe.createController
  )
  .post(
    '/upload',
    upload().single('recipe-video'),
    Recipe.uploadController
  )
  .get('/:recipeId', Recipe.findOneController)
  .get('/all/:userId', Recipe.findAllController)
  .delete('/:recipeId', Recipe.deleteController)
  .put('/:recipeId/update', Recipe.updateController)

module.exports = router;