const { user_game_history } = require("../models");
module.exports = {
  getuser_game_history_api: (req, res) => {
    user_game_history
      .findAll({
        attributes: [
          "id_history",
          "user_id",
          "game_title",
          "game_level",
          "score",
          "waktu",
        ],
      })
      .then((result) => {
        if (result.length > 0) {
          res.status(200).json({
            message: "Mengambil Data User Game History Berhasil",
            data: result,
          });
        } else {
          res.status(404).json({
            message: "Data User Game History Tidak di Temukan",
            data: result,
          });
        }
      })
      .catch((err) => {
        res.status(500).json({
          message: "Gagal Menemukan Data User Game History",
          err: err.message,
        });
      });
  },
  getuser_game_historybyid_api: (req, res) => {
    user_game_history
      .findOne({
        where: {
          user_id: req.params.id,
        },
        attributes: [
          "id_history",
          "user_id",
          "game_title",
          "game_level",
          "score",
          "waktu",
        ],
      })
      .then((result) => {
        if (result) {
          res.status(200).json({
            message: "Mengambil Data User Game History By Id Berhasil",
            result,
          });
        } else {
          res.status(404).json({
            message:
              "User Game History dengan ID " +
              req.params.id +
              " Tidak di temukan",
            result,
          });
        }
      })
      .catch((err) => {
        res.status(500).json({
          message: "Gagal Mendapatkan Data User Game History By Id",
          err: err.message,
        });
      });
  },
  createuser_game_history_api: (req, res) => {
    user_game_history
      .create({
        user_id: req.body.user_id,
        game_title: req.body.game_title,
        game_level: req.body.game_level,
        score: req.body.score,
        waktu: req.body.waktu,
      })
      .then((result) => {
        res.status(200).json({
          message: "Berhasil Membuat Data User Game History",
          result,
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: "Gagal Membuat Data User Game History",
          err: err.message,
        });
      });
  },
  updateuser_game_history_api: (req, res) => {
    user_game_history
      .update(
        {
          user_id: req.body.user_id,
          game_title: req.body.game_title,
          game_level: req.body.game_level,
          score: req.body.score,
          waktu: req.body.waktu,
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
              "User Game History dengan ID " +
              req.params.id +
              " Tidak di temukan",
            result,
          });
        } else {
          res.status(200).json({
            message: "Data User Game History Berhasil di Update",
            result,
          });
        }
      })
      .catch((err) => {
        res.status(500).json({
          message: "Data User Game History Gagal di Update",
          err: err.message,
        });
      });
  },
  deleteuser_game_history_api: (req, res) => {
    user_game_history
      .destroy({
        where: {
          user_id: req.params.id,
        },
      })
      .then((result) => {
        if (result == 0) {
          res.status(404).json({
            message:
              "User Game History dengan ID " +
              req.params.id +
              " Tidak di temukan",
            result,
          });
        } else {
          res.status(200).json({
            message: "Data User Game History Berhasil di Hapus",
            result,
          });
        }
      })
      .catch((err) => {
        res.status(500).json({
          message: "Data User Game History Gagal di Hapus",
          err: err.message,
        });
      });
  },
};
