const db = require("../models");
const user = require("../models/user")
const User =  db.user
var bodyParser = require('body-parser');
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");


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
        passport.authenticate("user_rule", { session: false }),
        async (req, res) => {
            console.log(req.user[0].name)
            User.findAll({
                 where: { name: req.user[0].name },
               
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
                const hashedPass = CryptoJS.AES.encrypt(
                    req.body.password,
                    process.env.CRYPTO_SECRET
                ).toString();
                await User.create({
                    name: req.body.name,
                    email: req.body.email,
                    password: hashedPass
                   
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
        









    app.post("/api/auth/signin",
    bodyParser.json(),
 //   passport.authenticate("user_rule", { session: false }),
     async (req, res) => {
        // console.log(req.body);
        const email = req.body.email;
        const password = req.body.password;

        await User.findOne({ where: { email: email } })
            .then(async (result) => {
                if (!result) {
                    res.json({
                        err: 404,
                        msg: "No user found with the requested email",
                    });
                } else {
                    const bytes = CryptoJS.AES.decrypt(
                        result.password,
                        process.env.CRYPTO_SECRET
                    );
                    const resultPassword = bytes.toString(CryptoJS.enc.Utf8);
                    console.log(resultPassword)
                    if (resultPassword == password) {
                        const payload = { name: result.name };
                        const token = jwt.sign(payload, process.env.SECRET);
                        res.json({ msg: "login success", token: token,payload });
                    } else {
                        res.status(401).json({
                            msg: "Password did not match",
                        });
                    }
                }
            })
            .catch((err) => {
                console.log(err);
                res.json({ msg: ">> Error while finding data: ", err });
            });
    });


}