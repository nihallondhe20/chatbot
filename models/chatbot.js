'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class chatbot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  chatbot.init({
    name: DataTypes.STRING,
    uid: DataTypes.INTEGER,
    desc: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'chatbot',
  });
  return chatbot;
};