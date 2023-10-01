'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class conditions_models extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ProjectModel, SMModel, SituationModel}) {
      // define association here
      this.belongsTo(ProjectModel, {foreignKey: 'projectId'})
      this.belongsTo(SMModel, {foreignKey: 'smId', through:'SMSItuation'})
      this.belongsTo(SituationModel, {foreignKey: 'situationId', through:'SMSItuation'})
    }
  }
  conditions_models.init({
  }, {
    sequelize,
    tableName: 'conditions_models',
    modelName: 'ConditionModel',
  });
  return conditions_models;
};