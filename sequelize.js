// sequelize.js
const { Sequelize, DataTypes } = require('sequelize');


const sequelize = new Sequelize("resep_makanan", "root", "", {
  host: "localhost",
  port: 3308,
  dialect: "mysql",
});


// Definisi Model Category
const Category = sequelize.define('Category', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});


// Definisi Model Recipe
const Recipe = sequelize.define('Recipe', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ingredients: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  instructions: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  image_url: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  category_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Category,
      key: 'id',
    },
  },
});

// Definisi Model Review
const Review = sequelize.define('Review', {
    name: {
      type: DataTypes.STRING,
      allowNull: false, // Tidak boleh kosong
    },
    review: {
      type: DataTypes.TEXT,
      allowNull: false, // Tidak boleh kosong
    },
  });

  // Definisi Model User
const User = sequelize.define("User", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  // Definisi Model Contact
const Contact = sequelize.define('Contact', {
  nama: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  messages: {
    type: DataTypes.TEXT,
    allowNull: false,
  }
});

// Relasi antar model
// Relasi antar model
Category.hasMany(Recipe, { 
  foreignKey: 'category_id',  // Pastikan menggunakan category_id
  as: 'recipes' 
});

Recipe.belongsTo(Category, { 
  foreignKey: 'category_id',  // Pastikan menggunakan category_id
  as: 'category'  
});


module.exports = { sequelize, Category, Recipe, Review, User, Contact };
