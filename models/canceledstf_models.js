'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class canceledstf_models extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({UserModel, STFModel}) {
      this.belongsTo(UserModel, {foreignKey: 'canceledbyId'})
      this.belongsTo(STFModel, {foreignKey: 'stfId'})
    }
  }
  canceledstf_models.init({
    comment: {
      type: DataTypes.STRING,
      allowNull: false
    },
    canceledbyId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    stfId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'canceledstf_models',
    modelName: 'CanceledSTFModel',
  });
  return canceledstf_models;
};