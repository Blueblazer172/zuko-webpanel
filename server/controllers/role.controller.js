const db = require("../models");
const Role = db.role;
const Room = db.room;

exports.create = (req, res) => {
    const role = {
        name: req.body.name,
    };

    Role.create(role)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Role."
            });
        });
};

exports.findAll = (req, res) => {
    Role.findAll()
        .then(roles => {
            res.send(roles);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving roles."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Role.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Role with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Role with id=" + id
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Role.update(req.body, {
        where: {id: id}
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Role was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Role with id=${id}. Maybe Role was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Role with id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Role.destroy({
        where: {id: id}
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Role was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Role with id=${id}. Maybe Role was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Role with id=" + id
            });
        });
};

exports.deleteAll = (req, res) => {
    Role.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({message: `${nums} Roles were deleted successfully!`});
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all roles."
            });
        });
};

exports.roleRooms = (req, res) => {
    Role.findAll({
        include: [{
            model: Room
        }],
    }).then((roles) => {
        let rolesRoomes = [];

        roles.forEach((role) => {
            let rooms = [];

            role.dataValues.rooms.forEach((room) => {
                rooms.push(room.dataValues.name)
            });

            rolesRoomes.push({
                id: role.id,
                name: role.name,
                rooms: rooms
            });
        });

        res.send(rolesRoomes)
    })
};

exports.findRooms = (req, res) => {
    const id = req.params.id;

    Role.findAll({
        include: [{
            model: Room
        }],
        where: {
            id: id
        }
    }).then((role) => {
        let rooms = [];

        role[0].dataValues.rooms.forEach((room) => {
            rooms.push(room.dataValues.name)
        });

        res.send(rooms);
    })
};

exports.setRooms = (req, res) => {
    const roleId = req.params.id;
    const rooms = req.body.rooms;

    Role.findByPk(roleId).then(async (role) => {
        await role.setRooms([]);

        rooms.forEach((room) => {
            Room.findAll({
                where: {
                    name: room
                },
                raw: true
            }).then(async(roomRole) => {
                await role.addRooms([roomRole[0].id]);
            });
        });

        res.send(rooms);
    })
        .catch((err) => {
            console.log(err)
            res.status(500).send({
                message: "Error setting Rooms for Role with roleId=" + roleId
            });
        })
}
