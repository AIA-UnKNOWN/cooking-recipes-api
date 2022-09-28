const router = require('express').Router();

const { upload } = require('@middlewares/FileUpload');
const Recipe = require('@controllers/Recipe');

router
  .post(
    '/create',
    upload().single('recipe-video'),
    Recipe.createController
  )
  .post(
    '/upload',
    upload().single('recipe-video'),
    Recipe.uploadController
  )
  .get('/:recipeId', Recipe.findOneController)
  .get('/all/:userId', Recipe.findAllController)

module.exports = router;