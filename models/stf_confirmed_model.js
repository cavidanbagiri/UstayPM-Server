'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class stf_confirmed_model extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({STFModel, UserModel}) {
      // define association here
      this.belongsTo(STFModel, {foreignKey: 'stfId'})
      this.belongsTo(UserModel, {foreignKey: 'confirmedBy'})
    }
  }
  stf_confirmed_model.init({
    confirmed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    } ,
    comment: {
      type: DataTypes.STRING,
      allowNull: true
    } 
  }, {
    sequelize,
    tableName: 'stf_confirmed_models',
    modelName: 'STFConfirmedModel',
  });
  return stf_confirmed_model;
};