'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('sm_models', {
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
    await queryInterface.addConstraint('sm_models', {
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
    await queryInterface.addConstraint('sm_models', {
      fields: ['vendorId'],
      type: 'foreign key',
      name: '"vendorId"',
      references: { //Required field
        table: 'vendors_models',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
    await queryInterface.addConstraint('sm_models', {
      fields: ['supplierId'],
      type: 'foreign key',
      name: '"supplierId"',
      references: { //Required field
        table: 'users_models',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
    await queryInterface.addConstraint('sm_models', {
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


// await queryInterface.addConstraint('sms_nums', {
//   fields: ['projectId'],
//   type: 'foreign key',
//   name: '"projectId"',
//   references: { //Required field
//     table: 'project_models',
//     field: 'id'
//   },
//   onDelete: 'cascade',
//   onUpdate: 'cascade'
// });