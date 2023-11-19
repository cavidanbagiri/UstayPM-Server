'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('new_stf_notification_models', {
      fields: ['createUserId'],
      type: 'foreign key',
      name: 'createUserId',
      references: {
        table: 'users_models',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
    await queryInterface.addConstraint('new_stf_notification_models', {
      fields: ['notifyUserId'],
      type: 'foreign key',
      name: 'notifyUserId',
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
