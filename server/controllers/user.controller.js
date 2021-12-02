const db = require("../models");
const bcrypt = require("bcryptjs");
const User = db.user;
const Log = db.log;
const Room = db.room;
const Role = db.role;

exports.create = (req, res) => {
    let errors = []
    if (!req.body.name) {
        errors.push('Name cannot be empty');
    }

    if (!req.body.email) {
        errors.push('Email cannot be empty');
    }

    if (!req.body.password) {
        errors.push('Password cannot be empty');
    }

    if (errors.length > 0) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const user = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    };

    User.create(user)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the User."
            });
        });
};

exports.findAll = (req, res) => {
    User.findAll({
        attributes: {
            exclude: ['password', 'createdAt', 'updatedAt', 'username'],
        }
    })
        .then(async users => {
            let usersWithRoomsAndRoles = [];

            for (let i = 0; i < users.length; i++) {
                let userRoles = await users[i].getRoles({raw: true});
                let userRooms = await users[i].getRooms({raw: true});

                usersWithRoomsAndRoles.push({
                    user: users[i].dataValues,
                    userRoles: userRoles,
                    userRooms: userRooms
                });
            }

            res.send(usersWithRoomsAndRoles);
        })
        .catch(err => {
            console.log(err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    User.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find User with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving User with id=" + id
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    let user = req.body;

    if (req.body.password) {
        user = {...user, password: bcrypt.hashSync(req.body.password, 8)}
    }

    User.update(user, {
        where: {id: id}
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "User was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating User with id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    User.destroy({
        where: {id: id}
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "User was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete User with id=${id}. Maybe User was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
};

exports.deleteAll = (req, res) => {
    User.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({message: `${nums} User were deleted successfully!`});
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all users."
            });
        });
};
exports.findLogs = (req, res) => {
    const id = req.params.id;

    User.findAll({
        attributes: {
            exclude: ['password', 'email', 'name', 'id', 'createdAt', 'updatedAt', 'username'],
        },
        include: [{
            model: Log,
            attributes: {
                include: [['createdAt', 'created']],
                exclude: ['id', 'updatedAt']
            },
            include: [{
                model: Room,
                attributes: {
                    include: [['name', 'roomName']],
                    exclude: ['createdAt', 'updatedAt', 'logId', 'roomId']
                }
            }]
        }],
        where: {
            id: id
        },
        raw: true
    })
        .then(data => {
            if (data) {
                let filtered = [];
                for (const item of data) {
                    const mapping = {
                        'logs.created': "created",
                        'logs.rooms.roomName': "roomName",
                    };

                    // MAGIC START
                    const filteredData = Object.keys(item)
                        .filter((key => mapping.hasOwnProperty(key)))
                        .reduce((acc, key) => {
                            acc[mapping[key]] = item[key];
                            return acc;
                        }, {});
                    // MAGIC END

                    filtered.push(filteredData)
                }

                res.send(filtered);
            } else {
                res.status(404).send({
                    message: `Cannot find Log for User with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Log for User with id=" + id
            });
        });
};

exports.allAccess = (req, res) => {
    res.status(200).send("Dieser Text ist für alle sichtbar.");
};

exports.userBoard = (req, res) => {
    res.status(200).send("Dieser Text ist für alle User sichtbar.");
};

exports.adminBoard = (req, res) => {
    res.status(200).send("Dieser Text ist für alle Admins sichtbar.");
};

exports.roles = (req, res) => {
    const id = req.params.id;

    User.findAll({
        where: {id: id},
        exclude: ['password', 'email', 'name', 'id', 'createdAt', 'updatedAt', 'username'],
        include: [{
            model: Role,
            exclude: ['id', 'createdAt', 'updatedAt'],
        }],
        raw: true
    }).then((user) => {
        let retRoles = [];
        user.forEach((item) => {
            retRoles.push(item['roles.name'])
        });

        res.send(retRoles);
    })
        .catch(() => {
            res.status(500).send({
                message: "Error retrieving Roles for User with id=" + id
            });
        });
};

exports.rooms = (req, res) => {
    const id = req.params.id;

    User.findAll({
        where: {id: id},
        exclude: ['password', 'email', 'name', 'id', 'createdAt', 'updatedAt', 'username'],
        include: [{
            model: Room,
            exclude: ['id', 'createdAt', 'updatedAt'],
        }],
        raw: true
    }).then((user) => {
        let retRooms = [];
        user.forEach((item) => {
            retRooms.push(item['rooms.name'])
        });

        res.send(retRooms);
    })
        .catch(() => {
            res.status(500).send({
                message: "Error retrieving Rooms for User with id=" + id
            });
        });
};

exports.updateRooms = (req, res) => {
    const id = req.params.id;
    const rooms = req.body.rooms;

    User.findByPk(id).then(async (user) => {
        await user.setRooms([]);

        rooms.forEach((room) => {
            Room.findAll({
                where: {
                    name: room
                },
                raw: true
            }).then(async (room) => {
                await user.setRooms([room[0].id]);
            });
        });

        res.send(rooms);
    })
        .catch(() => {
            res.status(500).send({
                message: "Error setting Rooms for User with id=" + id
            });
        });
};

exports.updateRoles = (req, res) => {
    const id = req.params.id;
    const roles = req.body.roles;

    User.findByPk(id).then(async (user) => {
        await user.setRoles([]);

        roles.forEach((role) => {
            Role.findAll({
                where: {
                    name: role
                },
                raw: true
            }).then(async (role) => {
                await user.addRoles([role[0].id]);
            });
        });

        res.send(roles);
    })
        .catch(() => {
            res.status(500).send({
                message: "Error setting Rooms for User with id=" + id
            });
        });
};
