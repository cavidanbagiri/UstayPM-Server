'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class sm_models extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ProjectModel, DepartmentModel,VendorModel, UserModel, STFModel}) {
      this.belongsTo(ProjectModel,{foreignKey:'projectId'})
      this.belongsTo(DepartmentModel,{foreignKey:'departmentId'})
      this.belongsTo(VendorModel,{foreignKey:'vendorId'})
      this.belongsTo(UserModel,{foreignKey:'supplierId'})
      this.belongsTo(STFModel,{foreignKey:'stfId'})
    }
  }
  sm_models.init({
    sm_num: {
      type: DataTypes.STRING,
      allowNull: false
    },
    sm_material_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    sm_material_amount: {
      type: DataTypes.STRING,
      allowNull: false
    },
    sm_material_unit: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    total: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    currency: {
      type: DataTypes.CHAR(15),
      allowNull: false
    },
    left_over: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    approximate_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    projectId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    departmentId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    vendorId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    supplierId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    stfId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    

  }, {
    sequelize,
    tableName: 'sm_models',
    modelName: 'SMModel',
  });
  return sm_models;
};