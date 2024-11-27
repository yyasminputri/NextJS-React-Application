// models/category.js
'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      Category.hasMany(models.Recipe, {
        foreignKey: 'category_id',
        as: 'recipes',
      });
    }
  }

  Category.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Category',
      tableName: 'categories', // Tentukan nama tabel jika berbeda dengan nama model
      timestamps: true,
    }
  );
  return Category;
};

