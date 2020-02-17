'use strict';
module.exports = (sequelize, DataTypes) => {
  const Note = sequelize.define('Note', {
    body: DataTypes.TEXT,
    userId: DataTypes.STRING,
    imgURL: DataTypes.STRING
  }, {});
  Note.associate = function(models) {
  };
  return Note;
};