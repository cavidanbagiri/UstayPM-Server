'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('stf_confirmed_models', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      confirmed: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        default: false
      } ,
      comment: {
        type: Sequelize.STRING,
        allowNull: true
      },
      stfId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      confirmedBy: {
        type: Sequelize.INTEGER,
        allowNull: false
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
    await queryInterface.dropTable('stf_confirmed_models');
  }
};