const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorsAliases: false,
        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle
        }
    });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model.js")(sequelize, Sequelize);
db.role = require("./role.model.js")(sequelize, Sequelize);
db.log = require("./log.model.js")(sequelize, Sequelize);
db.room = require("./room.model.js")(sequelize, Sequelize);
db.userAccessRooms = require("./user-access-rooms.js")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId"
});
db.user.belongsToMany(db.role, {
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId"
});

db.log.belongsToMany(db.user, {
    through: "user_logs",
    foreignKey: "logId",
    otherKey: "userId"
});
db.user.belongsToMany(db.log, {
    through: "user_logs",
    foreignKey: "userId",
    otherKey: "logId"
});

db.log.belongsToMany(db.room, {
    through: "room_logs",
    foreignKey: "logId",
    otherKey: "roomId"
});
db.room.belongsToMany(db.log, {
    through: "room_logs",
    foreignKey: "roomId",
    otherKey: "logId"
});

db.room.belongsToMany(db.role, {
    through: "room_roles",
    foreignKey: "roomId",
    otherKey: "roleId"
});
db.role.belongsToMany(db.room, {
    through: "room_roles",
    foreignKey: "roleId",
    otherKey: "roomId"
});

db.user.belongsToMany(db.room, {
    through: "user_rooms",
    foreignKey: "userId",
    otherKey: "roomId"
});
db.room.belongsToMany(db.user, {
    through: "user_rooms",
    foreignKey: "roomId",
    otherKey: "userId"
});

db.ROLES = ["admin", "user"];

module.exports = db;
