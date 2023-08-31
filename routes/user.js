const db = require("../models");
const user = require("../models/user")
const User = db.user
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
            const userId = parseInt(req.params.id);
            User.findAll({
                where: { id: userId },

            })
                .then((usr) => {

                    res.json({ msg: "User data", usr });
                })
                .catch((err) => {
                    console.log(err);
                    return ({
                        msg: ">> Error while fetching user ",
                        err,
                    });
                });


        })
        app.get(
            "/user/all/:id",
            bodyParser.json(),
            passport.authenticate("user_rule", { session: false }),
            async (req, res) => {
                console.log(req.user[0].name)
                const userId = parseInt(req.params.id);
                User.findAll({
                    where: { id: userId },
    
                })
                    .then((usr) => {
    
                        res.json({ msg: "User data", usr });
                    })
                    .catch((err) => {
                        console.log(err);
                        return ({
                            msg: ">> Error while fetching user ",
                            err,
                        });
                    });
    
    
            })

        app.get('/api/users/:id', (req, res) => {
            const userId = parseInt(req.params.id);
          
            db.query('SELECT * FROM users WHERE id = ?', [userId], (error, results) => {
              if (error) {
                res.status(500).json({ error: 'Internal Server Error' });
              } else if (results.length === 0) {
                res.status(404).json({ error: 'User not found' });
              } else {
                res.json(results[0]);
              }
            });
          });

    app.post(
        "/user/add",
        bodyParser.json(),
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
                .then((newuser) => {

                    res.json({ msg: "User Account successfully created", newuser });
                })
                .catch((err) => {
                    console.log(err);
                    return ({
                        msg: ">> Error while creating user",
                        err,
                    });
                });


        })


    app.post("/user/signin",
        bodyParser.json(),
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
                            res.json({ msg: "login success", token: token, payload });
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