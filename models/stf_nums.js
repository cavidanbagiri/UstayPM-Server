'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class stf_nums extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ProjectModel}) {
      // define association here
      this.belongsTo(ProjectModel, {foreignKey: 'projectId'})
    }
  }
  stf_nums.init({
    stf_nums: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'stf_nums',
    modelName: 'STFNUMS',
  });
  return stf_nums;
};