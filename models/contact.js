'use strict';
module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define('Contact', {
    nama: DataTypes.STRING,
    email: DataTypes.STRING,
    messages: DataTypes.TEXT,
  }, {});
  Contact.associate = function(models) {
    // associations can be defined here
  };
  return Contact;
};
