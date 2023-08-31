const { Sequelize } = require("sequelize");
const passportJWT = require("passport-jwt");
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

module.exports = function (passport){
    const jwtOptions = { 
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.SECRET,
    };
    const db = require("../models");
    const user = require("../models/user")
    const User =  db.user

    passport.use(
        "user_rule",
        new JwtStrategy(jwtOptions, async (payload, done) => {
           // console.log(User)
            await User.findAll({
                where: { name: payload.name },
                
            })
                .then((user) => {
                    if (user) {
                    //     console.log(user);
                        done(null, user);
                    } else {
                        done(null, false);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        })
    );

};