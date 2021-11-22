const {authJwt} = require("../middleware");
module.exports = app => {
    const role = require("../controllers/role.controller.js");
    const router = require("express").Router();

    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    router.post("/", role.create);
    router.get("/", role.findAll);
    router.get("/:id", role.findOne);
    router.put("/:id", role.update);
    router.delete("/:id", role.delete);
    router.delete("/", role.deleteAll);
    app.use('/api/role', [authJwt.verifyToken], router);
};
