// models/recipe.js
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Recipe extends Model {
    static associate(models) {
      // Set relasi belongsTo dari Recipe ke Category
      Recipe.belongsTo(models.Category, {
        foreignKey: 'category_id', // Kolom foreign key yang menghubungkan ke tabel Category
        as: 'category',  // Alias untuk kategori
      });
    }
  }

  Recipe.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,  // Pastikan judul resep wajib diisi
      },
      ingredients: {
        type: DataTypes.TEXT,
        allowNull: false,  // Pastikan bahan wajib diisi
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      instructions: {
        type: DataTypes.TEXT,
        allowNull: false,  // Pastikan instruksi wajib diisi
      },
      image_url: {
        type: DataTypes.STRING,
        allowNull: true,  // Image URL boleh kosong
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,  // Setiap resep harus memiliki kategori
      },
    },
    {
      sequelize,
      modelName: 'Recipe',
      tableName: 'recipes', // Nama tabel sesuai dengan nama di database
      timestamps: true,  // Menambahkan kolom createdAt dan updatedAt secara otomatis
    }
  );

  return Recipe;
};
