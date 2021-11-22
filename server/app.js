const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const bcrypt = require("bcryptjs");
require('dotenv').config();
const port = process.env.PORT;
const db = require("./models");
const User = db.user;
const Role = db.role;
const Room = db.room;

const corsOptions = {
    origin: '*',
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
require("./routes/permission.routes")(app);
require("./routes/role.routes")(app);
require("./routes/room.routes")(app);

app.listen(port, () => {
    console.log(`Zuko app listening at http://localhost:${port}`)
});

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
        name: "hausmeister"
    });

    Role.create({
        id: 4,
        name: "reinigungskraft"
    });

    Room.create({
        id: 1,
        name: "101",
    }).then((room) => {
        room.setRoles([4])
    });

    Room.create({
        id: 2,
        name: "102",
    }).then((room) => {
        room.setRoles([3, 4])
    });

    Room.create({
        id: 3,
        name: "103",
    }).then((room) => {
        room.setRoles([4])
    });

    User.create({
        id: 1,
        name: "admin",
        username: "admin",
        email: "admin@zuko.app",
        password: bcrypt.hashSync('admin', 8),
    }).then(user => {
        // set admin role to user
        user.setRoles([2, 3]);
    });

    User.create({
        id: 2,
        name: "Hans Hausmeister",
        username: "hans",
        email: "hans@zuko.app",
        password: bcrypt.hashSync('hans', 8)
    });

    User.create({
        id: 3,
        name: "Anna",
        username: "anna",
        email: "anna@zuko.app",
        password: bcrypt.hashSync('anna', 8)
    });

    User.create({
        id: 4,
        name: "test",
        username: "test",
        email: "test@zuko.app",
        password: bcrypt.hashSync('test', 8)
    });
}

module.exports = app;
