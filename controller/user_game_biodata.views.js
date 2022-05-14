/** @format */

const { user_game_biodata } = require("../models");
const moment = require("moment");
const bcrypt = require("bcrypt");

module.exports = {
  getuser_game_biodata_views: (req, res) => {
    user_game_biodata
      .findAll({
        attributes: [
          "id_biodata_user",
          "user_id",
          "name_user",
          "gender",
          "email",
          "createdAt",
          "updatedAt",
        ],
      })
      .then((result) => {
        if (result.length > 0) {
          // res.status(200).json({ message: 'Mengambil Data User Game Biodata Berhasil', result });
          res.render("usergames/index", { usergames: result, moment });
        } else {
          // res.status(404).json({ message: 'User Game Tidak di temukan', result });
          res.render("usergames/index", { usergames: result, moment });
        }
      })
      .catch((err) => {
        // res.status(500).json({ message: 'Gagal Mendapatkan Data User Game Biodata', err: err.message });
        res.render("error", { status: res.status(500), err: err.message });
      });
  },
  get getuser_game_biodata_views() {
    return this._getuser_game_biodata_views;
  },
  set getuser_game_biodata_views(value) {
    this._getuser_game_biodata_views = value;
  },
  getuser_game_biodatabyid_views: (req, res) => {
    user_game_biodata
      .findOne({
        where: {
          id_user: req.params.id,
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
          // res.status(200).json({ message: 'Mengambil Data User Game Biodata By Id Berhasil', result });
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
        // res.status(500).json({ message: 'Gagal Mendapatkan Data User Game Biodata By Id', err: err.message });
        res.render("error", { status: res.status(500), err: err.message });
      });
  },
  createuser_game_biodata_fromviews: (req, res) => {
    res.render("usergames/create", { page_name: "usergames" });
  },
  createuser_game_biodata_views: async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    user_game_biodata
      .create({
        user_id: req.body.user_id,
        name_user: req.body.name_user,
        gender: req.body.gender,
        email: req.body.email,
      })
      .then((result) => {
        res.redirect("/view/get-users-games-biodata");
      })
      .catch((err) => {
        // res.status(500).json({ message: 'Gagal Membuat User Game Biodata', err: err.message });
        res.render("error", { status: res.status(500), err: err.message });
      });
  },
  updateuser_game_biodata_views: async (req, res) => {
    req.method = req.body._method;
    const { user_id, name_user, gender, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
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
        // res.status(500).json({ message: 'Gagal Mengupdate User Game Biodata', err: err.message });
        res.render("error", { status: res.status(500), err: err.message });
      });
  },
  deleteuser_game_biodata_views: (req, res) => {
    user_game_biodata
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
          // res.status(200).json({ message: 'Berhasil Menghapus User Game Biodata', result });
          res.redirect("/view/");
        }
      })
      .catch((err) => {
        // res.status(500).json({ message: 'Gagal Menghapus User Game Biodata', err: err.message });
        res.render("error", { status: res.status(500), err: err.message });
      });
  },
};
