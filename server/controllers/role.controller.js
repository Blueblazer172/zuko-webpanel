const db = require("../models");
const Role = db.role;

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
