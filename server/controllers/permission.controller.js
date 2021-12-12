const axios = require("axios");
const db = require("../models");
const User = db.user;
const Room = db.room;
const Role = db.role;
const Log = db.log;
const UserAccessRooms = db.userAccessRooms;

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
            if (roomName == "102") {
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

                            Room.findOne({where: {name: roomName}}).then((room) => {
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
        .catch(() => {
            res.status(500).send({
                message: "Error fetching permissions for user: " + id,
            });
        });
};

exports.requests = (req, res) => {
    UserAccessRooms.findAll().then(async (useraccessrooms) => {
        let retData = []

        for (const useraccessroom of useraccessrooms) {
            let room = await Room.findByPk(useraccessroom.roomId);
            let user = await User.findByPk(useraccessroom.userId);

            retData.push({
                id: useraccessroom.id,
                userName: user.name,
                roomName: room.name
            });
        }

        res.send(retData);
    });
}


exports.create = async (req, res) => {
    let roomName = req.body.roomName;
    let room = await Room.findAll({
        where: {
            name: roomName,
        },
    });

    let data = {
        userId: req.body.userId,
        roomId: room[0].id
    };

    UserAccessRooms.create(data)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Room."
            });
        });

};

exports.ignore = (req, res) => {
    const id = req.params.id;

    UserAccessRooms.destroy({
        where: {
            id: id
        }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Permission Request was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Permission Request with id=${id}. Maybe Permission Request was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Permission Request with id=" + id
            });
        });
}

exports.accept = async (req, res) => {
    const id = req.params.id;

    UserAccessRooms.findByPk(id).then((data) => {
        User.findByPk(data.userId).then(async user => {
            user.addRooms([data.roomId]);

            await UserAccessRooms.destroy({
                where: {
                    id: id
                }
            });

            res.send({
                message: `Permission Request for ${user.name} was accepted successfully!`
            });
        }).catch(err => {
            res.status(500).send({
                message: "Could not delete Permission Request with id=" + id
            });
        });
    });
}
