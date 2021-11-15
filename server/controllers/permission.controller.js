const axios = require("axios");
const { request } = require("../app");
const { role } = require("../models");
const db = require("../models");
const User = db.user;
const Room = db.room;
const Role = db.role;
const Log = db.log;

exports.checkPermission = (req, res) => {
    let device = "";
    const id = parseInt(req.body.id);
    const roomName = req.body.room;

    Room.findAll({
        where: {
            name: roomName,
        },
        raw: true,
        attributes: {
            include: [["name", "RoomName"]],
            exclude: ["name", "createdAt", "updatedAt"],
        },
        include: {
            model: Role,
            required: true,
            attributes: {
                include: [["name", "RoleName"]],
                exclude: ["name", "createdAt", "updatedAt"],
            },
            include: {
                model: User,
                attributes: {
                    include: [["name", "UserName"]],
                    exclude: [
                        "username",
                        "email",
                        "password",
                        "createdAt",
                        "updatedAt",
                    ],
                },
                where: {
                    id: id,
                },
            },
        },
    })
        .then((user) => {
            if (roomName == "102"){
                device = "http://192.168.178.89:4444/toggle"
            } else {
                device = "http://192.168.178.94:8080/user"
            }
            if (user.length > 0) {
                axios({
                    method: "post",
                    url: device,
                    data: user,
                })
                    .then(() => {
                        Log.create().then((log) => {
                            User.findByPk(id).then((user) => {
                                log.setUsers([user.id]);
                            });

                            Room.findOne({ where: { name: roomName } }).then((room) => {
                                log.setRooms([room.id]);
                            });
                        })
                        res.send("Permission granted");
                    })
                    .catch(function (error) {
                        res.status(404).send({
                            message: "Endpoint device unreachable",
                        });
                    });
            } else {
                axios({
                    method: "post",
                    url: device,
                })
                .catch(function (error) {
                    res.status(404).send({
                        message: "Endpoint device unreachable",
                    });
                });
                res.send("Permission denied");
            }
        })
        .catch((err) => {
            console.log(err)
            res.status(500).send({
                message: "Error fetching permissions for user: " + id,
            });
        });
};
