'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class provided_models extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({WarehouseModel, UserModel, WarehouseDeliveryTypeModel, DepartmentModel}) {
      this.belongsTo(WarehouseModel, {foreignKey: 'warehouseId'})
      this.belongsTo(UserModel, {foreignKey: 'userId'})
      this.belongsTo(WarehouseDeliveryTypeModel, {foreignKey: 'typeId'})
      this.belongsTo(DepartmentModel, {foreignKey: 'departmentId'})
      this.belongsTo(UserModel, {foreignKey: 'returnbyId'})
    }
  }
  provided_models.init({
    provided_amount: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    deliver_to: {
      type: DataTypes.STRING,
      allowNull: false
    },
    card_number: {
      type: DataTypes.CHAR(10),
      allowNull: false
    },
    provided_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    serial_no: {
      type: DataTypes.STRING,
    },
    unique_id: {
      type: DataTypes.STRING,
    },
    return_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    returnbyId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    }
  }, {
    sequelize,
    tableName: 'provided_models',
    modelName: 'ProvidedModel',
  });
  return provided_models;
};