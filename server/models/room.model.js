module.exports = (sequelize, Sequelize) => {
    return sequelize.define("rooms", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING
        }
    });
};
