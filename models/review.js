'use strict';
const { Model } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    // Fungsi ini digunakan untuk mendefinisikan relasi jika ada
    static associate(models) {
      // Di sini bisa menambahkan relasi jika diperlukan
    }
  }


  // Inisialisasi model Review dengan kolom name dan review
  Review.init(
    {
      name: {
        type: DataTypes.STRING, // Kolom name yang bertipe string
        allowNull: false, // Tidak boleh kosong
      },
      review: {
        type: DataTypes.TEXT, // Kolom review yang bertipe teks
        allowNull: false, // Tidak boleh kosong
      },
    },
    {
      sequelize,
      modelName: 'Review', // Nama model yang digunakan dalam sequelize
      tableName: 'Reviews', // Nama tabel dalam database
      timestamps: true, // Menyimpan timestamps (createdAt, updatedAt)
    }
  );


  return Review;
};
