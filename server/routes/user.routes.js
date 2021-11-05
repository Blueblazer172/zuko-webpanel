const {authJwt} = require("../middleware");
module.exports = app => {
    const user = require("../controllers/user.controller.js");
    const router = require("express").Router();

    router.post("/", user.create);
    router.get("/", user.findAll);
    router.get("/:id", user.findOne);
    router.put("/:id", user.update);
    router.delete("/:id", user.delete);
    router.delete("/", user.deleteAll);
    router.get("/:id/log", user.findLogs);
    app.use('/api/user', [authJwt.verifyToken], router);
};
