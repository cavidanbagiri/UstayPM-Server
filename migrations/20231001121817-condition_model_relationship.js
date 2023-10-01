'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('conditions_models', {
      fields: ['projectId'],
      type: 'foreign key',
      name: '"projectId"',
      references: { //Required field
        table: 'project_models',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
    await queryInterface.addConstraint('conditions_models', {
      fields: ['smId'],
      type: 'foreign key',
      name: '"smId"',
      references: { //Required field
        table: 'sm_models',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
    await queryInterface.addConstraint('conditions_models', {
      fields: ['situationId'],
      type: 'foreign key',
      name: '"situationId"',
      references: { //Required field
        table: 'situation_models',
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
