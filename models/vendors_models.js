'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class vendors_models extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  vendors_models.init({
    vendor_name: {
      type:DataTypes.STRING,
      allowNull: false
    },
    country: {
      type:DataTypes.STRING,
      allowNull: true
    },
    address: {
      type:DataTypes.STRING,
      allowNull: true
    },
    email: {
      type:DataTypes.STRING,
      allowNull: true
    },
    contact_number: {
      type:DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'vendors_models',
    modelName: 'VendorModel',
  });
  return vendors_models;
};