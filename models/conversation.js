'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Conversation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Conversation.init({
    chid: DataTypes.INTEGER,
    desc: DataTypes.STRING,
    t1: DataTypes.STRING,
    t2: DataTypes.STRING,
    t3: DataTypes.STRING,
    t4: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Conversation',
  });
  return Conversation;
};