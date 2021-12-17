const {authJwt} = require("../middleware");
const role = require("../controllers/role.controller.js");
module.exports = app => {
    const role = require("../controllers/role.controller.js");
    const router = require("express").Router();

    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    router.post("/", role.create);
    router.get("/", role.roleRooms);
    router.get("/:id", role.findOne);
    router.put("/:id", role.update);
    router.delete("/:id", [authJwt.isAdmin], role.delete);
    router.delete("/", [authJwt.isAdmin], role.deleteAll);
    router.get("/rooms/:id", role.findRooms);
    router.post("/rooms/:id", role.setRooms);

    app.use('/api/role', [authJwt.verifyToken], router);
};
