'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class room_model extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({UserModel}) {
      // define association here
      this.belongsTo(UserModel, {foreignKey: 'firstuserId'})
      this.belongsTo(UserModel, {foreignKey: 'seconduserId'})
    }
  }
  room_model.init({
    room_name: {
      type: DataTypes.STRING
    },
  }, {
    sequelize,
    tableName: 'room_models',
    modelName: 'RoomModel',
  });
  return room_model;
};