"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user_game_history extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.user_game, {
        foreignKey: "user_id",
        as: "user_game_history",
      });
    }
  }
  user_game_history.init(
    {
      id_history: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      user_id: DataTypes.INTEGER,
      game_title: DataTypes.TEXT,
      game_level: DataTypes.TEXT,
      score: DataTypes.TEXT,
      waktu: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "user_game_history",
    }
  );
  return user_game_history;
};
