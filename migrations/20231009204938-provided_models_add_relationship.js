'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('provided_models', {
      fields: ['warehouseId'],
      type: 'foreign key',
      name: '"warehouseId"',
      references: { //Required field
        table: 'warehouse_models',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
    await queryInterface.addConstraint('provided_models', {
      fields: ['userId'],
      type: 'foreign key',
      name: '"userId"',
      references: { //Required field
        table: 'users_models',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
    await queryInterface.addConstraint('provided_models', {
      fields: ['typeId'],
      type: 'foreign key',
      name: '"typeId"',
      references: { //Required field
        table: 'warehouse_delivery_types',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
    await queryInterface.addConstraint('provided_models', {
      fields: ['departmentId'],
      type: 'foreign key',
      name: '"departmentId"',
      references: { //Required field
        table: 'department_models',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
