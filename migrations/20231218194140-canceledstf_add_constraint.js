'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('canceledstf_models', {
      fields: ['canceledbyId'],
      type: 'foreign key',
      name: '"canceledbyId"',
      references: { //Required field
        table: 'users_models',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
    await queryInterface.addConstraint('canceledstf_models', {
      fields: ['stfId'],
      type: 'foreign key',
      name: '"stfId"',
      references: { //Required field
        table: 'stf_models',
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
