/** @format */

const { user_game_history } = require("../models");
const moment = require("moment");
const bcrypt = require("bcrypt");

module.exports = {
  getuser_game_history_views: (req, res) => {
    user_game_history
      .findAll({
        attributes: [
          "id_history",
          "user_id",
          "game_title",
          "game_level",
          "score",
          "waktu",
          "createdAt",
          "updatedAt",
        ],
      })
      .then((result) => {
        if (result.length > 0) {
          // res.status(200).json({ message: 'Mengambil Data User Game History Berhasil', result });
          res.render("usergames/index", { usergames: result, moment });
        } else {
          // res.status(404).json({ message: 'User Game Tidak di temukan', result });
          res.render("usergames/index", { usergames: result, moment });
        }
      })
      .catch((err) => {
        // res.status(500).json({ message: 'Gagal Mendapatkan Data User Game History', err: err.message });
        res.render("error", { status: res.status(500), err: err.message });
      });
  },
  getuser_game_historybyid_views: (req, res) => {
    user_game_history
      .findOne({
        where: {
          id_user: req.params.id,
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
          // res.status(200).json({ message: 'Mengambil Data User Game History By Id Berhasil', result });
          res.render("usergames/update", { usergame: result });
        } else {
          // res.status(404).json({ message: 'User Game dengan ID ' + req.params.id + ' Tidak di temukan', result });
          res.render("error", {
            status: res.status(404),
            err: "Data tidak ditemukan!",
          });
        }
      })
      .catch((err) => {
        // res.status(500).json({ message: 'Gagal Mendapatkan Data User Game History By Id', err: err.message });
        res.render("error", { status: res.status(500), err: err.message });
      });
  },
  createuser_game_history_formviews: (req, res) => {
    res.render("usergames/create", { page_name: "usergames" });
  },
  createuser_game_history_views: async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    user_game_history
      .create({
        user_id: req.body.user_id,
        game_title: req.body.game_title,
        game_level: req.body.game_level,
        score: req.body.score,
        waktu: req.body.waktu,
      })
      .then((result) => {
        res.redirect("/view/get-users-games-history");
      })
      .catch((err) => {
        // res.status(500).json({ message: 'Gagal Membuat User Game History', err: err.message });
        res.render("error", { status: res.status(500), err: err.message });
      });
  },
  updateuser_game_history_views: async (req, res) => {
    req.method = req.body._method;
    const { user_id, name_user, game_title, game_level, score, waktu, email } =
      req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
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
        if (result[0] === 0) {
          // res.status(404).json({
          //   message: 'User Game dengan ID ' + req.params.id + ' Tidak di temukan',
          //   result,
          // });
          res.render("error", {
            status: res.status(404),
            err: "Data tidak ditemukan!",
          });
        } else {
          res.redirect("/view/");
        }
      })
      .catch((err) => {
        // res.status(500).json({ message: 'Gagal Mengupdate User Game History', err: err.message });
        res.render("error", { status: res.status(500), err: err.message });
      });
  },
  deleteuser_game_history_views: (req, res) => {
    user_game_history
      .destroy({
        where: {
          user_id: req.params.id,
        },
      })
      .then((result) => {
        if (result === 0) {
          // res.status(404).json({
          //   message: 'User Game dengan ID ' + req.params.id + ' Tidak di temukan',
          //   result,
          // });
          res.render("error", {
            status: res.status(404),
            err: "Data tidak ditemukan!",
          });
        } else {
          // res.status(200).json({ message: 'Berhasil Menghapus User Game History', result });
          res.redirect("/view/");
        }
      })
      .catch((err) => {
        // res.status(500).json({ message: 'Gagal Menghapus User Game History', err: err.message });
        res.render("error", { status: res.status(500), err: err.message });
      });
  },
};
