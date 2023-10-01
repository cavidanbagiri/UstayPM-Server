'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('sm_models', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      sm_num: {
        type: Sequelize.STRING,
        allowNull: false
      },
      sm_material_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      sm_material_amount: {
        type: Sequelize.STRING,
        allowNull: false
      },
      sm_material_unit: {
        type: Sequelize.STRING,
        allowNull: false
      },
      price: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      total: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      currency: {
        type: Sequelize.CHAR(15),
        allowNull: false
      },
      left_over: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      approximate_date: {
        type: Sequelize.DATE,
        allowNull: true
      },
      projectId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      departmentId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      vendorId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      supplierId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      stfId: {
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
    await queryInterface.dropTable('sm_models');
  }
};