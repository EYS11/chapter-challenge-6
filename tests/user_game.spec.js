/** @format */

const { user_game, sequelize } = require("../models");
require("../controller/user_game_api");
const request = require("supertest");
const app = require("../app");
//const sequelize = require("sequelize");
const { QueryTypes } = require("sequelize");

describe("User Games API Controller Testing", () => {
  beforeAll(async () => {
    await request(app)
      .post("/api/register")
      .send({ username: "ester", password: "123456" });
    const login = await request(app)
      .post("/api/login")
      .send({ username: "ester", password: "123456" });
    console.log(login.body);
    token = login.body.token;
  });

  afterAll(async () => {
    try {
      await sequelize.query(
        "TRUNCATE user_games, user_game_biodata, user_game_histories RESTART IDENTITY;",
        { type: QueryTypes.RAW }
      );
    } catch (error) {
      console.log(error);
    }
  });

  test("run /api/get-users-games To Get All User Games with Auth", async () => {
    const inputuser_game = await user_game.create({
      username: "ester",
      password: "123456",
    });

    const { body, statusCode } = await request(app)
      .get("/api/get-users-games")
      .set({ Authorization: token });
    expect(statusCode).toEqual(200);
    expect(body.message).toEqual("Mengambil Data User Game Berhasil");
    expect(body.data[body.data.length - 1].username).toEqual(
      inputuser_game.username
    );
    expect(body.data[body.data.length - 1].password).toEqual(
      inputuser_game.password
    );
    expect(body.data).toHaveLength(2);
  });

  test("run /api/get-users-games To Get All User Games without Auth and Fail", async () => {
    const { statusCode, error } = await request(app).get(
      "/api/get-users-games"
    );
    expect(statusCode).toEqual(403);
    expect(error.text).toEqual("A token is required for authentication");
  });

  test("run /api/get-user-game/:id To Find One User Games By ID with Auth", async () => {
    const { body, statusCode, error } = await request(app)
      .get("/api/get-user-game/1")
      .set({ Authorization: token });
    console.log(body);
    expect(statusCode).toEqual(200);
    expect(body.message).toEqual("Mengambil Data User Game By Id Berhasil");
    expect(body.result.username).toEqual("ester");
  });

  test("run /api/get-user-game/:id To Find One User Games with unknown ID and Fail", async () => {
    const { body, statusCode } = await request(app)
      .get("/api/get-user-game/100")
      .set({ Authorization: token });
    expect(statusCode).toEqual(404);
    expect(body.message).toEqual("User Game dengan ID 100 Tidak di temukan");
  });

  test("run /api/get-user-game/:id To Find One User Games By ID without Auth and Fail", async () => {
    const { statusCode, error } = await request(app).get(
      "/api/get-user-game/1"
    );
    expect(statusCode).toEqual(403);
    expect(error.text).toEqual("A token is required for authentication");
  });

  test("run /api/create-user-game To Create User Games Data with Auth", async () => {
    const { body, statusCode } = await request(app)
      .post("/api/create-user-game")
      .set({ Authorization: token })
      .send({ username: "ester", password: "123456" });
    expect(statusCode).toEqual(200);
    expect(body.message).toEqual("Berhasil Membuat Data User Game");
    expect(body.result.username).toEqual("ester");
    expect(body.result.password).toEqual(body.result.password);
  });

  // test("run /api/create-user-game To Create Already Exist User Games Data and Fail", async () => {
  //   const { body, statusCode } = await request(app)
  //     .post("/api/create-user-game")
  //     .set({ Authorization: token })
  //     .send({ username: "ester", password: "123456" });
  //   expect(statusCode).toEqual(500);
  //   expect(body.message).toEqual("Gagal Create User Game");
  //   expect(body.err).toEqual(
  //     "Validation error: Username Telah digunakan!,\nValidation error: Email Telah digunakan!"
  //   );
  // });

  test("run /api/create-user-game To Create User Games Data without Auth and Fail", async () => {
    const { statusCode, error } = await request(app)
      .post("/api/create-user-game")
      .send({ username: "malton", password: "123456" });
    expect(statusCode).toEqual(403);
    expect(error.text).toEqual("A token is required for authentication");
  });

  test("run /api/update-user-games/:id To Update User Games Data with Auth", async () => {
    const { body, statusCode } = await request(app)
      .put("/api/update-user-games/2")
      .set({ Authorization: token })
      .send({ username: "malton", password: "654321" });
    expect(statusCode).toEqual(200);
    expect(body.message).toEqual("Data User Game Berhasil di Update");
    expect(body.result).toEqual([1]);
  });

  test("run /api/update-user-games/:id To Update User Games Data without Auth and Fail", async () => {
    const { statusCode, error } = await request(app)
      .put("/api/update-user-games/4")
      .send({ username: "ester", password: "111111" });
    expect(statusCode).toEqual(403);
    expect(error.text).toEqual("A token is required for authentication");
  });

  test("run /api/delete-user-games/:id To Delete User Games Data with Auth", async () => {
    const { body, statusCode } = await request(app)
      .delete("/api/delete-user-games/1")
      .set({ Authorization: token });
    expect(statusCode).toEqual(200);
    expect(body.message).toEqual("Data User Game Berhasil di Hapus");
    expect(body.result).toEqual(1);
  });

  test("run /api/delete-user-games/:id To Delete User Games with unknown ID and Fail", async () => {
    const { body, statusCode } = await request(app)
      .delete("/api/delete-user-games/100")
      .set({ Authorization: token });
    expect(statusCode).toEqual(404);
    expect(body.message).toEqual("User Game dengan ID 100 Tidak di temukan");
    expect(body.result).toEqual(0);
  });

  test("run /api/delete-user-games/:id To Delete User Games Data without Auth and Fail", async () => {
    const { statusCode, error } = await request(app).delete(
      "/api/delete-user-games/1"
    );
    expect(statusCode).toEqual(403);
    expect(error.text).toEqual("A token is required for authentication");
  });
});
