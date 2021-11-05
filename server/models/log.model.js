module.exports = (sequelize, Sequelize) => {
    return sequelize.define("logs", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        }
    });
};
