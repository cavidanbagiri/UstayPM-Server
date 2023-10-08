'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('warehouse_models', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      delivery_material_name: {
        type: Sequelize.STRING,
        allowNull: true
      },
      delivery_material_amount: {
        type: Sequelize.DOUBLE,
        allowNull: true,
      },
      delivery_material_unit: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      delivery_material_price: {
        type: Sequelize.DOUBLE,
        allowNull: true,
      },
      delivery_material_total: {
        type: Sequelize.DOUBLE,
        allowNull: true,
      },
      delivery_material_currency: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      doc_number: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      doc_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      certificate: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      passport: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      acceptedBy: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      smId: {
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
    await queryInterface.dropTable('warehouse_models');
  }
};