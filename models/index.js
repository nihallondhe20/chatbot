'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const user = require('./user');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.user=require("./user")(sequelize, Sequelize.DataTypes)
db.chatbot=require("./chatbot")(sequelize, Sequelize.DataTypes)
db.Conversation=require("./conversation")(sequelize, Sequelize.DataTypes)




// db.user.hasMany(db.chatbot,{
//   foreignKey:"id",
//    as:"chatbotid"
// })

// db.chatbot.belongsTo(db.user, {
// 	foreignKey: "uid",
// 	as: "userid",
// });

module.exports = db;


db.user.hasMany(db.chatbot, {
  foreignKey: 'id', // This is the foreign key in the Chatbot model that references the User model
  as: 'chatbots', // Alias for the association
});

db.chatbot.belongsTo(db.user, {
  foreignKey: 'uid', // This is the foreign key in the Chatbot model that references the User model
  as: 'user', // Alias for the association
});


// db.chatbot.hasMany(db.conversation, {
//   foreignKey: 'id',  
//   as: 'conversation', // Alias for the association
// });

// db.conversation.belongsTo(db.chatbot, {
//   foreignKey: 'chid', // This is the foreign key in the Chatbot model that references the User model
//   as: 'chatbot', // Alias for the association
// });

// Define the 'hasMany' association from Chatbot to Conversation

// Define the 'hasMany' association from Chatbot to Conversation
db.chatbot.hasOne(db.Conversation, {
  foreignKey: 'id', // This should be the foreign key in the Conversation table that references the Chatbot model
  as: 'conversations', // Alias for the association
});

// Define the 'belongsTo' association from Conversation to Chatbot
db.Conversation.belongsTo(db.chatbot, {
  foreignKey: 'chid', // This should be the foreign key in the Conversation table that references the Chatbot model
  as: 'chatbot', // Alias for the association
});











