'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class status_model extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ DepartmentModel, UserModel }) {
      // define association here
      this.belongsTo(DepartmentModel, {foreignKey: 'departmentId'})
      this.hasMany(UserModel, {foreignKey: 'statusId'})
    }
  }
  status_model.init({
    status_name: {
      type:DataTypes.STRING,
      allowNull: false
    },
    status_code: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    sequelize,
    tableName:'status_models',
    modelName: 'StatusModel',
  });
  return status_model;
};