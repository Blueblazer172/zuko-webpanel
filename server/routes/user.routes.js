const {authJwt} = require("../middleware");
module.exports = app => {
    const user = require("../controllers/user.controller.js");
    const router = require("express").Router();

    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    router.post("/", user.create);
    router.get("/", user.findAll);
    router.get("/:id", user.findOne);
    router.put("/:id", user.update);
    router.delete("/:id", user.delete);
    router.delete("/", user.deleteAll);
    router.get("/:id/log", user.findLogs);
    router.get("/rooms/:id/", user.rooms);
    router.get("/roles/:id/", user.roles);
    router.post("/role-rooms/:id/", user.updateRolesRooms);
    router.get("/verify/:id/", (req, res) => {res.send("Token valid")})
    app.use('/api/user', [authJwt.verifyToken], router);
};
