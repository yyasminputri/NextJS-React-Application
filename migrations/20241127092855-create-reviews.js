'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Membuat tabel Reviews dengan kolom name dan review
    await queryInterface.createTable('Reviews', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER, // Kolom id sebagai primary key dan auto increment
      },
      name: {
        type: Sequelize.STRING, // Kolom name yang bertipe string
        allowNull: false, // Tidak boleh kosong
      },
      review: {
        type: Sequelize.TEXT, // Kolom review yang bertipe teks
        allowNull: false, // Tidak boleh kosong
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE, // Timestamp untuk waktu pembuatan
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE, // Timestamp untuk waktu pembaruan
      },
    });
  },

  // Jika rollback, tabel Reviews akan dihapus
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Reviews');
  },
};
