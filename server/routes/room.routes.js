const {authJwt} = require("../middleware");
module.exports = app => {
    const room = require("../controllers/room.controller.js");
    const router = require("express").Router();

    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    router.post("/", room.create);
    router.get("/", room.findAll);
    router.get("/:id", room.findOne);
    router.put("/:id", room.update);
    router.delete("/:id", [authJwt.isAdmin], room.delete);
    router.delete("/", [authJwt.isAdmin], room.deleteAll);

    app.use('/api/room', [authJwt.verifyToken], router);
};
