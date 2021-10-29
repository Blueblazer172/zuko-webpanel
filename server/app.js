const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const bcrypt = require("bcryptjs");
require('dotenv').config();

const db = require("./models");
const User = db.user;
const Role = db.role;

const corsOptions = {
    origin: 'http://localhost:8080',
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

if (process.env.RE_SYNC === "always") {
    db.sequelize.sync({force: true}).then(() => {
        console.log("Drop and re-sync db.");
        initial();
    });
} else {
    db.sequelize.sync();
    console.log("Just sync db");
}

require('./routes/auth.routes')(app);
require("./routes/user.routes")(app);


// @TODO add error handling

function initial() {
    Role.create({
        id: 1,
        name: "user"
    });

    Role.create({
        id: 2,
        name: "admin"
    });

    User.create({
        name: "admin",
        username: "admin",
        email: "admin@zuko.app",
        password: bcrypt.hashSync(process.env.ADMIN_PASSWORD || 'admin1234', 8),
    }).then(user => {
        // set admin role to user
        user.setRoles([2])
    });
}

module.exports = app;
