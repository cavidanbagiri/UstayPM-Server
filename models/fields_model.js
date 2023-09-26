'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class fields_model extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ProjectModel, STFModel}) {
      // define association here
      this.belongsTo(ProjectModel, {foreignKey:'projectId'})
      this.hasMany(STFModel, {foreignKey: 'projectId'})
    }
  }
  fields_model.init({
    field_name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    tableName:"fields_models",
    modelName: 'FieldsModel',
  });
  return fields_model;
};