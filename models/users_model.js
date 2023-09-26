'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users_model extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ProjectModel, DepartmentModel, StatusModel, STFModel, STFConfirmedModel}) {
      // define association here
      this.belongsTo(ProjectModel, {foreignKey:'projectId'})
      this.belongsTo(DepartmentModel, {foreignKey:'departmentId'})
      this.belongsTo(StatusModel, {foreignKey:'statusId'})
      this.hasMany(STFModel, {foreignKey: 'projectId'})
      this.hasMany(STFConfirmedModel, {foreignKey: 'createdBy'})
    }
  }
  users_model.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    sequelize,
    tableName: 'users_models',
    modelName: 'UserModel',
  });
  return users_model;
};