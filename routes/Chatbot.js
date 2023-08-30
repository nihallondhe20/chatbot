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
      //  passport.authenticate("user_rule", { session: false }),
        async (req, res) => {
            Chatbot.findAll({
                //where: { id: 1},
                include: [{ model: User, as: "user" }],
          
            })
                .then((appo) => {
                    
                    res.json ({ msg: "all user appointments", appo });
                }) 
                .catch((err) => {
                    console.log(err);
                    return({
                        msg: ">> Error while fetching user appointments",
                        err,
                    });
                });
           
    
           })
    

           app.post(
            "/chatbot/add",
             bodyParser.json(),
          //  passport.authenticate("user_rule", { session: false }),
            async (req, res) => {
                await Chatbot.create({
                    name: req.body.name,
                    desc: req.body.desc,
                    uid: req.body.uid,
                   
                })
                    .then((appo) => {
                        
                        res.json ({ msg: "all user appointments", appo });
                    }) 
                    .catch((err) => {
                        console.log(err);
                        return({
                            msg: ">> Error while fetching user appointments",
                            err,
                        });
                    });
               
        
               })
        




}