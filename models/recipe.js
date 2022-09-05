'use strict';
const {
  Model,
  Deferrable,
} = require('sequelize');
const User = require('@models/user');

module.exports = (sequelize, DataTypes) => {
  class Recipe extends Model {
    static associate(models) {
      const { Recipe, User, Upload } = models;
      Recipe.belongsTo(User, {
        sourceKey: 'id',
        foreignKey: 'user_id',
      });
      Recipe.hasMany(Upload, {
        sourceKey: 'id',
        foreignKey: 'recipe_id',
        onDelete: 'CASCADE',
      });
    }
  }
  Recipe.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      defaultValue: 'No description for this recipe'
    },
    is_favorite: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    user_id: {
      type: DataTypes.NUMBER,
      references: {
        model: User,
        key: 'id',
        deferrable: Deferrable.INITIALLY_IMMEDIATE,
      },
    },
  }, {
    sequelize,
    modelName: 'Recipe',
  });
  return Recipe;
};