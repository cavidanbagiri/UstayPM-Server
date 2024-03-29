"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class new_stf_notification_model extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({UserModel}) {
      this.belongsTo(UserModel,  {foreignKey: 'createUserId'} )
      this.belongsTo(UserModel,  {foreignKey: 'notifyUserId'} )
    }
  }
  new_stf_notification_model.init(
    {
      read: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      stfno: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "new_stf_notification_models",
      modelName: "NewSTFNotificationModel",
    }
  );
  return new_stf_notification_model;
};
