const db = require("../models");
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
        },
        include: [{
            model: Role,
            include: [{
                model: Room
            }]
        }],
        raw: true
    })
        .then(users => {
            let arr = {}
            users.forEach((user) => {
                if (user['id'] in arr){
                    if (!arr[user['id']]['role'].includes(user['roles.name'])){
                        arr[user['id']]['role'].push(user['roles.name'])
                    }
                    if (!arr[user['id']]['room'].includes(user['roles.rooms.name'])){
                        arr[user['id']]['room'].push(user['roles.rooms.name'])
                    }
                }
                else {
                    arr[user['id']]=
                    {
                        name: user['name'],
                        email: user['email'],
                        role: [user['roles.name']],
                        room: [user['roles.rooms.name']]
                    }
                }    
            })
            res.send(arr)
        })
        .catch(err => {
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

    User.update(req.body, {
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
            console.log(err)
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
