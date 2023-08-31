const db = require("../models");
const chatbot = require("../models/chatbot")
const Chatbot =  db.chatbot
var bodyParser = require('body-parser');
const user = require("../models/user")
const User =  db.user




module.exports = function (app, sequelize, passport) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });


    app.get(
        "/chatbot/all",
         bodyParser.json(),
        async (req, res) => {
            Chatbot.findAll({
                include: [{ model: User, as: "user" }],
          
            })
                .then((chatall) => {
                    
                    res.json ({ msg: "all chatbot data", chatall });
                }) 
                .catch((err) => {
                    console.log(err);
                    return({
                        msg: ">> Error while fetching chats",
                        err,
                    });
                });
           
    
           })
    

           app.post(
            "/chatbot/add",
             bodyParser.json(),
            async (req, res) => {
                await Chatbot.create({
                    name: req.body.name,
                    desc: req.body.desc,
                    uid: req.body.uid,
                   
                })
                    .then((chat) => {
                        
                        res.json ({ msg: "all successfully added", chat });
                    }) 
                    .catch((err) => {
                        console.log(err);
                        return({
                            msg: ">> Error while adding chatbot data",
                            err,
                        });
                    });
               
        
               })
        




}