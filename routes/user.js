const db = require("../models");
const user = require("../models/user")
const User =  db.user
var bodyParser = require('body-parser');



module.exports = function (app, sequelize, passport) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

console.log(User)

    app.get(
        "/user/all",
         bodyParser.json(),
      //  passport.authenticate("user_rule", { session: false }),
        async (req, res) => {
            User.findAll({
                // where: { userId: req.agent_id },
                // include: [{ model: Notary, as: "notary" }],
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
            "/user/add",
             bodyParser.json(),
          //  passport.authenticate("user_rule", { session: false }),
            async (req, res) => {
                await User.create({
                    name: req.body.name,
                    email: req.body.email,
                   
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