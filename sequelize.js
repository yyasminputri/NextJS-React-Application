const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("resep_makanan", "root", "", {
    host: "localhost",
    dialect: "mysql",
});

module.exports = sequelize;
