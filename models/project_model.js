'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class project_model extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  project_model.init({
    project_name: DataTypes.STRING,
    code_name: DataTypes.STRING
  }, {
    sequelize,
    tableName:'project_models',
    modelName: 'ProjectModel',
  });
  return project_model;
};

// postgres://ustay_pm_user:w6YSQ33DBLKS9YPaIMj5PiDjKB13QDPi@dpg-ck8u83vsasqs739c6oh0-a.frankfurt-postgres.render.com/ustay_pm