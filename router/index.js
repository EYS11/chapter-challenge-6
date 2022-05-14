const router = require("express").Router();
const auth = require("../middleware/auth");
const {
  getuser_game_api,
  getuser_gamebyid_api,
  createuser_game_api,
  updateuser_game_api,
  deleteuser_game_api,
} = require("../controller/user_game_api");

const {
  getuser_game_views,
  getuser_gamebyid_views,
  createuser_game_fromviews,
  createuser_game_views,
  updateuser_game_views,
  deleteuser_game_views,
} = require("../controller/user_game_views");

const {
  getuser_game_biodata_api,
  getuser_game_biodatabyid_api,
  createuser_game_biodata_api,
  updateuser_game_biodata_api,
  deleteuser_game_biodata_api,
} = require("../controller/user_game_biodata_api");
const { register, login } = require("../controller/auth_api");

// const {
//   getuser_game_biodata_views,
//   getuser_game_biodatabyid_views,
//   createuser_game_biodata_fromviews,
//   createuser_game_biodata_views,
//   updateuser_game_biodata_views,
//   deleteuser_game_biodata_views,
// } = require("../controller/user_game_biodata_views");
// const { register, login } = require("../controller/auth_views.js");

const {
  getuser_game_history_api,
  getuser_game_historybyid_api,
  createuser_game_history_api,
  updateuser_game_history_api,
  deleteuser_game_history_api,
} = require("../controller/user_game_history_api");

// const {
//   getuser_game_history_views,
//   getuser_game_historybyid_views,
//   createuser_game_history_formviews,
//   createuser_game_history_views,
//   updateuser_game_history_views,
//   deleteuser_game_history_views,
// } = require("../controller/user_game_history_views.text");

// User_Games Endpoint
router.get("/api/get-users-games", auth, getuser_game_api);
router.get("/api/get-user-game/:id", auth, getuser_gamebyid_api);
router.post("/api/create-user-game", auth, createuser_game_api);
router.put("/api/update-user-games/:id", auth, updateuser_game_api);
router.delete("/api/delete-user-games/:id", auth, deleteuser_game_api);

// User_Games_Biodata Endpoint
router.get("/api/get-users-games-biodata", auth, getuser_game_biodata_api);
router.get(
  "/api/get-user-games-biodata/:id",
  auth,
  getuser_game_biodatabyid_api
);
router.post(
  "/api/create-user-games-biodata",
  auth,
  createuser_game_biodata_api
);
router.put(
  "/api/update-user-games-biodata/:id",
  auth,
  updateuser_game_biodata_api
);
router.delete(
  "/api/delete-user-games-biodata/:id",
  auth,
  deleteuser_game_biodata_api
);

// User_Games_History Endpoint
router.get("/api/get-users-games-history", auth, getuser_game_history_api);
router.get(
  "/api/get-user-games-history/:id",
  auth,
  getuser_game_historybyid_api
);
router.post(
  "/api/create-user-games-history",
  auth,
  createuser_game_history_api
);
router.put(
  "/api/update-user-games-history/:id",
  auth,
  updateuser_game_history_api
);
router.delete(
  "/api/delete-user-games-history/:id",
  auth,
  deleteuser_game_history_api
);

// //User Game Views
// router.get("/views/get-user-games", getuser_game_views);
// router.get("/views/get-user-game/:id", getuser_gamebyid_views);
// router.post("/views/create-user-gamefrom", createuser_game_fromviews);
// router.post("/views/createusergame", createuser_game_views);
// router.put("/views/updateform/:id", updateuser_game_views);
// router.delete("/views/delete-user-games/:id", deleteuser_game_views);

// //User Game Biodata Views
// router.get("/views/get-users-games-biodata", auth, getuser_game_biodata_views);
// router.get(
//   "/views/get-user-games-biodata/:id",
//   auth,
//   getuser_game_biodatabyid_views
// );
// router.post(
//   "/views/create-user-games-biodatafrom",
//   auth,
//   createuser_game_biodata_fromviews
// );
// router.post(
//   "/views/create-user-games-biodata",
//   auth,
//   createuser_game_biodata_views
// );
// router.put(
//   "/views/update-user-games-biodata/:id",
//   auth,
//   updateuser_game_biodata_views
// );
// router.delete(
//   "/views/delete-user-games-biodata/:id",
//   auth,
//   deleteuser_game_biodata_views
// );

// // User Games History Views
// router.get("/views/get-users-games-history", auth, getuser_game_history_views);
// router.get(
//   "/views/get-user-games-history/:id",
//   auth,
//   getuser_game_historybyid_views
// );
// router.post(
//   "/views/create-user-games-historyfrom",
//   auth,
//   createuser_game_history_formviews
// );
// router.post(
//   "/views/create-user-games-history",
//   auth,
//   createuser_game_history_views
// );
// router.put(
//   "/views/update-user-games-history/:id",
//   auth,
//   updateuser_game_history_views
// );
// router.delete(
//   "/views/delete-user-games-history/:id",
//   auth,
//   deleteuser_game_history_views
// );

router.post("/api/register", register);
router.post("/api/login", login);

//User Game Views
module.exports = router;
