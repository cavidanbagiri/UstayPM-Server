'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class department_model extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({StatusModel, UserModel, STFModel}) {
      // define association here
      this.hasMany(StatusModel, {foreignKey: 'departmentId'})
      this.hasMany(UserModel, {foreignKey: 'departmentId'})
      this.hasMany(STFModel, {foreignKey: 'projectId'})
    }
  }
  department_model.init({
    department_name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'department_models',
    modelName: 'DepartmentModel',
  });
  return department_model;
};