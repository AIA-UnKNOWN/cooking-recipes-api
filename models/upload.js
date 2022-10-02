'use strict';
const {
  Model,
  Deferrable,
} = require('sequelize');
const Recipe = require('@models/recipe');

module.exports = (sequelize, DataTypes) => {
  class Upload extends Model {
    static associate(models) {
      const { Upload, Recipe } = models;
      Upload.belongsTo(Recipe, {
        sourceKey: 'id',
        foreignKey: 'recipe_id',
        onDelete: 'CASCADE',
      });
    }
  }
  Upload.init({
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    file_path: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    recipe_id: {
      type: DataTypes.NUMBER,
      references: {
        model: Recipe,
        id: 'key',
        deferrable: Deferrable.INITIALLY_IMMEDIATE,
      },
    },
  }, {
    sequelize,
    modelName: 'Upload',
  });
  return Upload;
};