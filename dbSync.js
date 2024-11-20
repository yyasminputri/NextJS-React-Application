const sequelize = require("./sequelize");
const User = require("./models/User");

const initDb = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connected to MySQL!");
        await sequelize.sync({ force: true }); // Gunakan { force: true } hanya saat pengembangan
        console.log("Database synced!");
    } catch (error) {
        console.error("Unable to connect to database:", error);
    }
};

initDb();
