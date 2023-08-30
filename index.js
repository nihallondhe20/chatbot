"use strict";
const express = require ('express')
const app = express();
require("dotenv").config();

const { Sequelize } = require("sequelize");
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);

})


const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    protocol: "postgres",
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },

    // dialectOptions: {
    // 	ssl: {
    // 		rejectUnauthorized: false, // very important
    // 	},
    // },
});
const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
};

connectDB();


app.get("/", function (req, res, next) {
    res.json({ msg: "API Working" });
});


require("../l1/routes/user")(app,sequelize)
require("../l1/routes/Chatbot")(app,sequelize)
require("../l1/routes/conversation")(app,sequelize)
app.use(function fourOhFourHandler(req, res) {
    res.status(404).json("404");
});
app.use(function fiveHundredHandler(err, req, res, next) {
    console.error(err);
    res.status(500).json("500");
});