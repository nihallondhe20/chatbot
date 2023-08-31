const db = require("../models");
const Conversation = require("../models/conversation")
const conversation =  db.Conversation
var bodyParser = require('body-parser');
const chatbot = require("../models/chatbot")
const Chatbot =  db.chatbot



module.exports = function (app, sequelize, passport) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

console.log(conversation)

    app.get(
        "/conversation/all",
         bodyParser.json(),
      //  passport.authenticate("user_rule", { session: false }),
        async (req, res) => {
            conversation.findAll({
                // where: { userId: req.agent_id },
                 include: [{ model: Chatbot, as: "chatbot" }],
            })
                .then((convo) => {
                    
                    res.json ({ msg: "all user conversation", convo });
                }) 
                .catch((err) => {
                    console.log(err);
                    return({
                        msg: ">> Error while fetching conversation",
                        err,
                    });
                });
           
    
           })
    

           app.post(
            "/conversation/add",
             bodyParser.json(),
            async (req, res) => {
                await conversation.create({
                    chid: req.body.chid,
                    desc: req.body.desc,
                    t1: req.body.t1,
                    t2: req.body.t2,
                    t3: req.body.t3
                   
                })
                    .then((convoadd) => {
                        
                        res.json ({ msg: "Successfully added conversation", convoadd });
                    }) 
                    .catch((err) => {
                        console.log(err);
                        return({
                            msg: ">> Error while adding conversation",
                            err,
                        });
                    });
               
        
               })
        




}