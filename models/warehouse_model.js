'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class warehouse_model extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({UserModel, SMModel}) {
      this.belongsTo(UserModel, {foreignKey: 'acceptedBy'})
      this.belongsTo(SMModel, {foreignKey: 'smId'})
    }
  }
  warehouse_model.init({
    delivery_material_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    delivery_material_amount: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    delivery_material_unit: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    delivery_material_price: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    delivery_material_total: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    delivery_material_currency: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    doc_number: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    doc_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    certificate: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    passport: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'warehouse_model',
  });
  return warehouse_model;
};