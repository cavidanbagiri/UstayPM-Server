'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('provided_models', 'return_date', Sequelize.DATE);
    await queryInterface.addColumn('provided_models', 'returnbyId', Sequelize.INTEGER);
    await queryInterface.addConstraint('provided_models', {
      fields: ['returnbyId'],
      type: 'foreign key',
      name: 'returnbyId',
      references: {
        table: 'users_models',
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
