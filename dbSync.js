const { sequelize, User, Category, Recipe, Review } = require("./sequelize");

const initDb = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to MySQL!");
    await sequelize.sync({ alter: true }); // Ganti dengan { alter: true } saat pengembangan
    console.log("Database synced!");
  } catch (error) {
    console.error("Unable to connect to database:", error);
  }
};

initDb();
