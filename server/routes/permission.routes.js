const {authJwt} = require("../middleware");
module.exports = app => {
    const permission = require("../controllers/permission.controller.js");
    const router = require("express").Router();

    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    router.post("/", permission.checkPermission);
    router.get("/requests", permission.requests);
    router.post("/request", permission.create);
    router.delete("/request/:id", permission.ignore);
    router.put("/request/:id", permission.accept);

    app.use('/api/permission', [authJwt.verifyToken], router);
};
