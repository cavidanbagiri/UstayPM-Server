"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class accept_sm_notification_models extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ UserModel }) {
      this.belongsTo(UserModel, { foreignKey: "createUserId" });
      this.belongsTo(UserModel, { foreignKey: "notifyUserId" });
    }
  }
  accept_sm_notification_models.init(
    {
      read: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      sm_no: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "accept_sm_notification_models",
      modelName: "AcceptSMNotificationModel",
    }
  );
  return accept_sm_notification_models;
};
