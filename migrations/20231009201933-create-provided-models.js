'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('provided_models', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      provided_amount: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      deliver_to: {
        type: Sequelize.STRING,
        allowNull: false
      },
      card_number: {
        type: Sequelize.CHAR(10),
        allowNull: false
      },
      provided_date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      warehouseId: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      typeId: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      departmentId: {
        type: Sequelize.INTEGER,
        allowNull: true
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
    await queryInterface.dropTable('provided_models');
  }
};