"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("user_game_histories", {
      id_history: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "user_games",
          key: "user_id",
        },
        onDelete: "CASCADE",
        onUpdate: "NO ACTION",
      },
      game_title: {
        type: Sequelize.TEXT,
      },
      game_level: {
        type: Sequelize.TEXT,
      },
      score: {
        type: Sequelize.TEXT,
      },
      waktu: {
        type: Sequelize.TEXT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("user_game_histories");
  },
};
