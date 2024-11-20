const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("resep_makanan", "root", "", {
    host: "localhost",
    port: 3308,
    dialect: "mysql",
});

module.exports = sequelize;
