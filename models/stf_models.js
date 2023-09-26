'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class stf_models extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ProjectModel, FieldsModel, UserModel, DepartmentModel, STFConfirmedModel}) {
      // define association here
      this.belongsTo(ProjectModel, {foreignKey: 'projectId'})
      this.belongsTo(UserModel, {foreignKey: 'userId'})
      this.belongsTo(FieldsModel, {foreignKey: 'fieldId'})
      this.belongsTo(DepartmentModel, {foreignKey: 'departmentId'})
      this.hasMany(STFConfirmedModel, {foreignKey: 'stfId'})
    }
  }
  stf_models.init({
    stf_num: {
      type: DataTypes.STRING,
      allowNull: false
    },
    material_type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    material_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    material_amount: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    material_unit: {
      type: DataTypes.STRING,
      allowNull: false
    },
    material_link: {
      type: DataTypes.STRING,
      allowNull: true
    },
    material_comment: {
      type: DataTypes.STRING,
      allowNull: true
    },
    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    sequelize,
    tableName: 'stf_models',
    modelName: 'STFModel',
  });
  return stf_models;
};