module.exports = (sequelize, Sequelize) => {
    return sequelize.define("rooms", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        }
    });
};
