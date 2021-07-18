'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('children', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        allowNull : false,
        type: Sequelize.INTEGER,
        references : {
          model : "users",
          key : "id",
        },
        onDelete : "CASCADE",
        onUpdate  : "CASCADE"
      },
      name: {
        type: Sequelize.STRING
      },
      photo: {
        type: Sequelize.STRING
      },
      type_user: {
        type: Sequelize.STRING
      },
      age: {
        type: Sequelize.STRING
      },
      dob: {
        type: Sequelize.STRING
      },
      status_child: {
        type: Sequelize.STRING
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('children');
  }
};