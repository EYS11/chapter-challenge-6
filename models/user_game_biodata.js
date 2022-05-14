"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user_game_biodata extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.user_game, {
        foreignKey: "user_id",
        as: "user_game_biodata",
      });
    }
  }
  user_game_biodata.init(
    {
      id_biodata_user: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      user_id: DataTypes.INTEGER,
      name_user: DataTypes.TEXT,
      gender: DataTypes.TEXT,
      email: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "user_game_biodata",
    }
  );
  return user_game_biodata;
};
