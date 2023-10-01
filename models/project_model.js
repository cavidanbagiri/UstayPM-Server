'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class project_model extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({UserModel, FieldsModel, STFNUMS, STFModel, SMSNums}) {
      // define association here
      this.hasMany(UserModel, {foreignKey: 'projectId'})
      this.hasMany(FieldsModel, {foreignKey: 'projectId'})
      this.hasMany(STFNUMS, {foreignKey: 'projectId'})
      this.hasMany(STFModel, {foreignKey: 'projectId'})
      this.hasMany(SMSNums, {foreignKey: 'projectId'}) // This Doesnt Work, Need TO Create new Migration and add this field To Project Model 
    }
  }
  project_model.init({
    project_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    code_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    sequelize,
    tableName: 'project_models',
    modelName: 'ProjectModel',
  });
  return project_model;
};