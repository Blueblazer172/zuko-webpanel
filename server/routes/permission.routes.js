const {authJwt} = require("../middleware");
module.exports = app => {
    const permission = require("../controllers/permission.controller.js");
    const router = require("express").Router();

    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    router.post("/", [authJwt.verifyToken], permission.checkPermission);
    app.use('/api/permission', router);
};
