const { user_game } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

module.exports = {
  getuser_game_api: (req, res) => {
    user_game
      .findAll({})
      .then((result) => {
        if (result.length > 0) {
          res.status(200).json({
            message: "Mengambil Data User Game Berhasil",
            data: result,
          });
        } else {
          res
            .status(404)
            .json({ message: "Data User Game Tidak di Temukan", data: result });
        }
      })
      .catch((err) => {
        res.status(500).json({
          message: "Gagal Menemukan Data User Game",
          err: err.message,
        });
      });
  },
  getuser_gamebyid_api: (req, res) => {
    user_game
      .findOne({
        where: {
          user_id: req.params.id,
        },
        attributes: ["user_id", "username", "password"],
      })
      .then((result) => {
        if (result) {
          res.status(200).json({
            message: "Mengambil Data User Game By Id Berhasil",
            result,
          });
        } else {
          res.status(404).json({
            message:
              "User Game dengan ID " + req.params.id + " Tidak di temukan",
            result,
          });
        }
      })
      .catch((err) => {
        res.status(500).json({
          message: "Gagal Mendapatkan Data User Game By Id",
          err: err.message,
        });
      });
  },
  createuser_game_api: async (req, res) => {
    try {
      const { username, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await user_game.create({
        username,
        password: hashedPassword,
      });
      const token = jwt.sign({ user_id: user.user_id }, process.env.TOKEN_KEY, {
        expiresIn: "15m",
      });
      user.token = token;

      res
        .status(200)
        .json({ message: "Berhasil Membuat Data User Game", result: user });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Gagal Membuat Data User Game", err: error.message });
    }
  },
  updateuser_game_api: (req, res) => {
    user_game
      .update(
        {
          username: req.body.username,
          password: req.body.password,
        },
        {
          where: {
            user_id: req.params.id,
          },
        }
      )
      .then((result) => {
        if (result == 0) {
          res.status(404).json({
            message:
              "User Game dengan ID " + req.params.id + " Tidak di temukan",
            result,
          });
        } else {
          res
            .status(200)
            .json({ message: "Data User Game Berhasil di Update", result });
        }
      })
      .catch((err) => {
        res.status(500).json({
          message: "Data User Game Gagal di Update",
          err: err.message,
        });
      });
  },
  deleteuser_game_api: (req, res) => {
    user_game
      .destroy({
        where: {
          user_id: req.params.id,
        },
      })
      .then((result) => {
        if (result == 0) {
          res.status(404).json({
            message:
              "User Game dengan ID " + req.params.id + " Tidak di temukan",
            result,
          });
        } else {
          res
            .status(200)
            .json({ message: "Data User Game Berhasil di Hapus", result });
        }
      })
      .catch((err) => {
        res.status(500).json({
          message: "Data User Game Gagal di Hapus",
          err: err.message,
        });
      });
  },
};
