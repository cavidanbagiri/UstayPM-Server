'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class message_models extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({UserModel}) {
      this.belongsTo(UserModel, {foreignKey: 'senderId'})
      this.belongsTo(UserModel, {foreignKey: 'receiverId'})
    }
  }
  message_models.init({
    message_text:{
      type: DataTypes.STRING,
    },
    read: {
      type: DataTypes.BOOLEAN
    }
  }, {
    sequelize,
    tableName: 'message_models',
    modelName: 'MessageModel',
  });
  return message_models;
};