module.exports = (sequelize, Sequelize) => {
    return sequelize.define("users", {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            validation: {
                isAlpha: true,
                len: [2, 50]
            }
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            validation: {
                isAlpha: true,
                len: [2, 50]
            }
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            validation: {
                isEmail: true
            }
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
};
