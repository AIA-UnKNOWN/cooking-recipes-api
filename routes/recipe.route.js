const router = require('express').Router();

const { upload } = require('@middlewares/FileUpload');
const Recipe = require('@controllers/Recipe');

router
  .post(
    '/upload',
    upload().single('recipe-video'),
    Recipe.createController
  )

module.exports = router;