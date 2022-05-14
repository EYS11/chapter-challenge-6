const { user_game_biodata } = require("../models");
module.exports = {
  getuser_game_biodata_api: (req, res) => {
    user_game_biodata
      .findAll({
        attributes: [
          "id_biodata_user",
          "user_id",
          "name_user",
          "gender",
          "email",
        ],
      })
      .then((result) => {
        if (result.length > 0) {
          res.status(200).json({
            message: "Mengambil Data User Game Biodata Berhasil",
            data: result,
          });
        } else {
          res.status(404).json({
            message: "Data User Game Biodata Tidak di Temukan",
            data: result,
          });
        }
      })
      .catch((err) => {
        res.status(500).json({
          message: "Gagal Menemukan Data User Game Biodata",
          err: err.message,
        });
      });
  },
  getuser_game_biodatabyid_api: (req, res) => {
    user_game_biodata
      .findOne({
        where: {
          user_id: req.params.id,
        },
        attributes: [
          "id_biodata_user",
          "user_id",
          "name_user",
          "gender",
          "email",
        ],
      })
      .then((result) => {
        if (result) {
          res.status(200).json({
            message: "Mengambil Data User Game Biodata By Id Berhasil",
            result,
          });
        } else {
          res.status(404).json({
            message:
              "User Game Biodata dengan ID " +
              req.params.id +
              " Tidak di temukan",
            result,
          });
        }
      })
      .catch((err) => {
        res.status(500).json({
          message: "Gagal Mendapatkan Data User Game Biodata By Id",
          err: err.message,
        });
      });
  },
  createuser_game_biodata_api: (req, res) => {
    user_game_biodata
      .create({
        user_id: req.body.user_id,
        name_user: req.body.name_user,
        gender: req.body.gender,
        email: req.body.email,
      })
      .then((result) => {
        res.status(200).json({
          message: "Berhasil Membuat Data User Game Biodata",
          result,
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: "Gagal Membuat Data User Game Biodata",
          err: err.message,
        });
      });
  },
  updateuser_game_biodata_api: (req, res) => {
    user_game_biodata
      .update(
        {
          user_id: req.body.user_id,
          name_user: req.body.name_user,
          gender: req.body.gender,
          email: req.body.email,
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
              "User Game Biodata dengan ID " +
              req.params.id +
              " Tidak di temukan",
            result,
          });
        } else {
          res.status(200).json({
            message: "Data User Game Biodata Berhasil di Update",
            result,
          });
        }
      })
      .catch((err) => {
        res.status(500).json({
          message: "Data User Game Biodata Gagal di Update",
          err: err.message,
        });
      });
  },
  deleteuser_game_biodata_api: (req, res) => {
    user_game_biodata
      .destroy({
        where: {
          user_id: req.params.id,
        },
      })
      .then((result) => {
        if (result == 0) {
          res.status(404).json({
            message:
              "User Game Biodata dengan ID " +
              req.params.id +
              " Tidak di temukan",
            result,
          });
        } else {
          res.status(200).json({
            message: "Data User Game Biodata Berhasil di Hapus",
            result,
          });
        }
      })
      .catch((err) => {
        res.status(500).json({
          message: "Data User Game Biodata Gagal di Hapus",
          err: err.message,
        });
      });
  },
};
