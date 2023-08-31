const { Sequelize } = require("sequelize");
const passportJWT = require("passport-jwt");
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;
var GoogleStrategy = require("passport-google-oauth20").Strategy;
var FacebookStrategy = require("passport-facebook").Strategy;

module.exports = function (passport) {
    const jwtOptions = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.SECRET,
    };
    const db = require("../models");
    const user = require("../models/user")
    const User =  db.user

    const Notary = db.Notary;
    const Notary_users = db.Notary_users
    passport.use(
        "user_rule",
        new JwtStrategy(jwtOptions, async (payload, done) => {
            console.log(User)
            await User.findAll({
                where: { name: payload.name },
                
            })
                .then((user) => {
                    if (user) {
                        // console.log(user);
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
//     passport.use(
//         "notary_rule",
//         new JwtStrategy(jwtOptions, async (payload, done) => {
//             await Notary.findOne({
//                 where: { phone: payload.phone },
//             })
//                 .then((notary) => {
//                     if (notary) {
//                         // console.log(notary);
//                         done(null, notary);
//                     } else {
//                         done(null, false);
//                     }
//                 })
//                 .catch((err) => {
//                     console.log(err);
//                 });
//         })
//     );

//     passport.use(
//         "user_email_phone_rule",
//         new JwtStrategy(jwtOptions, async (payload, done) => {
//             if(payload.phone){
//                 await User.findOne({
//                     where: { 
//                     phone: payload.phone},
//                 })
//                 .then((user) => {
//                     if (user) {
//                         // console.log(user);
//                         done(null, user);
//                     } else {
//                         done(null, false);
//                     }
//                 })
//                 .catch((err) => {
//                     console.log(err);
//                 });
//             }
//             else{
//                 await User.findOne({
//                     where: { 
//                     email: payload.email},
//                 })
//                 .then((user) => {
//                     if (user) {
//                         // console.log(user);
//                         done(null, user);
//                     } else {
//                         done(null, false);
//                     }
//                 })
//                 .catch((err) => {
//                     console.log(err);
//                 });
//             }
               
//         })
//     );

//     passport.use(
//         new GoogleStrategy(
//             {
//                 clientID: process.env.GOOGLE_CLIENT_ID,
//                 clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//                 callbackURL:
//                     process.env.BACKEND_URL + "/api/auth/google/callback",
//             },
//             async function (accessToken, refreshToken, profile, done) {
//                 console.log(profile);
//                 await User.findOne({
//                     where: { email: profile.emails[0].value },
//                 }).then(async (user) => {
//                     if (user) {
//                         await user.update({
//                             googleId: profile.id,
//                             avatar: profile.photos[0].value,
//                             fullName: profile.displayName,
//                         });
//                         // console.log(profile)
//                         done(null, user);
//                     } else {
//                         const newuser = await User.create({
//                             email: profile.emails[0].value,
//                             avatar: profile.photos[0].value,
//                             fullName: profile.displayName,
//                             googleId: profile.id,
//                         });
//                         done(null, newuser);
//                     }
//                 });
//             }
//         )
//     );

//     passport.use(
//         new FacebookStrategy(
//             {
//                 clientID: process.env.FACEBOOK_APP_ID,
//                 clientSecret: process.env.FACEBOOK_APP_SECRET,
//                 callbackURL:
//                     process.env.BACKEND_URL + "/api/auth/facebook/callback",
//                 profileFields: ["id", "displayName", "emails", "photos"],
//             },
//             async function (accessToken, refreshToken, profile, done) {
//                 // console.log(profile);
//                 await User.findOne({
//                     where: { email: profile.emails[0].value },
//                 }).then(async (user) => {
//                     if (user) {
//                         await user
//                             .update({
//                                 facebookId: profile.id,
//                                 fullName: profile.displayName,
//                                 avatar: profile.photos[0].value,
//                             })
//                             .then((update) => {
//                                 done(null, update);
//                             })
//                             .catch((err) => {
//                                 console.log(err);
//                                 return res.json({
//                                     msg: ">> Error while updateing user data: ",
//                                     err,
//                                 });
//                             });
//                     } else {
//                         const newuser = await User.create({
//                             email: profile.emails[0].value,
//                             facebookId: profile.id,
//                             fullName: profile.displayName,
//                             avatar: profile.photos[0].value,
//                         });
//                         done(null, newuser);
//                     }
//                 });
//             }
//         )
//     );

//     passport.serializeUser((user, done) => {
//         done(null, user.id);
//     });
//     passport.deserializeUser((id, done) => {
//         return done(null, id);
//     });


// passport.use(
//     "notary_user_rule",
//     new JwtStrategy(jwtOptions, async (payload, done) => {
//         await Notary_users.findOne({
//             where: { agent_id: payload.agent_id },
//         })
//             .then((user) => {
//                 if (user) {
//                     // console.log(user);
//                     done(null, user);
//                 } else {
//                     done(null, false);
//                 }
//             })
//             .catch((err) => {
//                 console.log(err);
//             });
//     })
// );
};