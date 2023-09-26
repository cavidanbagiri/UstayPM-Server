'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('stf_models', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      stf_num: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      material_type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      material_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      material_amount: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      material_unit: {
        type: Sequelize.STRING,
        allowNull: false
      },
      material_link: {
        type: Sequelize.STRING,
        allowNull: true
      },
      material_comment: {
        type: Sequelize.STRING,
        allowNull: true
      },
      completed: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      projectId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      fieldId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      departmentId: {
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
    await queryInterface.dropTable('stf_models');
  }
};