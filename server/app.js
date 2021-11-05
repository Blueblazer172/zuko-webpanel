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
const Room = db.room;
const Log = db.log;

const corsOptions = {
    origin: process.env.CORS_BACKEND_SERVER_URL || 'http://localhost:8080',
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
require("./routes/test.routes")(app);

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

    Role.create({
        id: 3,
        name: "zimmer1"
    });

    Role.create({
        id: 4,
        name: "zimmer2"
    });

    Room.create({
        id: 1,
        name: "Zimmer 1",
        neededRoleToAccess: "ROLE_ZIMMER1"
    }).then((room) => {
        room.setLogs([1]);
        room.setLogs([3]);
    });

    Room.create({
        id: 2,
        name: "Zimmer 2",
        neededRoleToAccess: "ROLE_ZIMMER2"
    }).then((room) => {
        room.setLogs([2]);
    });

    Log.create({
        id: 1
    });

    Log.create({
        id: 2
    });

    Log.create({
        id: 3
    });

    User.create({
        name: "admin",
        username: "admin",
        email: "admin@zuko.app",
        password: bcrypt.hashSync(process.env.ADMIN_PASSWORD || 'Admin1234', 8),
    }).then(async user => {
        // set admin role to user
        user.setRoles([2]);
        user.setLogs([3]);
    });

    User.create({
        name: "test",
        username: "test",
        email: "test@zuko.app",
        password: bcrypt.hashSync('Test1234', 8),
    }).then(user => {
        // set user role to user
        user.setRoles([1]);
        user.setLogs([1]);
        user.setLogs([2]);
    });
}

module.exports = app;
