'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class sms_nums extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ProjectModel}) {
      this.belongsTo(ProjectModel, {foreignKey: "projectId"})
    }
  }
  sms_nums.init({
    sms_nums: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'sms_nums',
    modelName: 'SMSNums',
  });
  return sms_nums;
};