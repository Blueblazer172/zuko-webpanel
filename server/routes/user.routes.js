module.exports = app => {
    const { authJwt } = require("../middleware");
    const user = require("../controllers/user.controller.js");
    // const router = require("express").Router();

    app.use((req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    // router.post("/", user.create);
    // router.get("/", user.findAll);
    // router.get("/:id", user.findOne);
    // router.put("/:id", user.update);
    // router.delete("/:id", user.delete);
    // router.delete("/", user.deleteAll);

    app.get("/api/test/all", user.allAccess);

    app.get('/api/test/admin',
        [authJwt.verifyToken, authJwt.isAdmin],
        user.adminBoard
    );

    app.get(
        "/api/test/user",
        [authJwt.verifyToken],
        user.userBoard
    );

    // app.use('/api/user', router);
};
