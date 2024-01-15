'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class starred_models extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({UserModel, STFModel, SMModel, ProjectModel}) {
      this.belongsTo(UserModel, {foreignKey:'userId'})
      this.belongsTo(STFModel, {foreignKey:'stfId'})
      this.belongsTo(SMModel, {foreignKey:'smId'})
      this.belongsTo(ProjectModel, {foreignKey:'projectId'})
      // define association here
    }
  }
  starred_models.init({
  }, {
    sequelize,
    tableName: 'starred_models',
    modelName: 'StarredModel',
  });
  return starred_models;
};