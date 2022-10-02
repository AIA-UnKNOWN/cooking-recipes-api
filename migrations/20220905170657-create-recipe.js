'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Recipes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        defaultValue: 'No description for this recipe'
      },
      is_favorite: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          id: 'key',
          deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
        },
        onDelete: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Recipes');
  }
};