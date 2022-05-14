/** @format */

const { user_game, sequelize } = require("../models");
require("../controller/user_game_api");
const request = require("supertest");
const app = require("../app");
//const sequelize = require("sequelize");
const { QueryTypes } = require("sequelize");

describe("User Games History API Controller Testing", () => {
  beforeAll(async () => {
    await request(app).post("/api/register").send({
      user_id: "1",
      game_title: "Lempar Bola Basket",
      game_level: "2",
      score: "53",
      waktu: "15:00-15:02 WIB",
    });
    const login = await request(app).post("/api/login").send({
      user_id: "3",
      game_title: "Lempar Bola Basket",
      game_level: "2",
      score: "53",
      waktu: "15:00-15:02 WIB",
    });
    token = login.body.token;
  });

  afterAll(async () => {
    await user_game_history.destroy({ where: { user_id: "3" } });
  });

  test("run /api/get-users-games-historyTo Get All User Games History with Auth", async () => {
    const inputuser_game_history = await user_game.create({
      user_id: "3",
      game_title: "Lempar Bola Basket",
      game_level: "2",
      score: "53",
      waktu: "15:00-15:02 WIB",
    });

    const { body, statusCode } = await request(app)
      .get("/api/get-user-games-history")
      .set({ Authorization: token });
    expect(statusCode).toEqual(200);
    expect(body.message).toEqual("Berhasil Get All User Game History");
    expect(body.result[body.result.length - 1].user_id).toEqual(
      inputuser_game_history.user_id
    );
    expect(body.result[body.result.length - 1].game_title).toEqual(
      inputuser_game_history.game_title
    );
    expect(body.result[body.result.length - 1].game_level).toEqual(
      inputuser_game_history.game_level
    );
    expect(body.result[body.result.length - 1].score).toEqual(
      inputuser_game_history.score
    );
    expect(body.result[body.result.length - 1].waktu).toEqual(
      inputuser_game_history.waktu
    );
    expect(body.result).toHaveLength(5);
  });

  test("run /api/get-users-games-history To Get All User Games History without Auth and Fail", async () => {
    const { statusCode, error } = await request(app).get(
      "/api/get-users-games-history"
    );
    expect(statusCode).toEqual(403);
    expect(error.text).toEqual("A token is required for authentication");
  });

  test("run /api/get-user-games-history/:id To Find One User Games History By ID with Auth", async () => {
    const { body, statusCode } = await request(app)
      .get("/api/get-users-games-history/1")
      .set({ Authorization: token });
    expect(statusCode).toEqual(200);
    expect(body.message).toEqual("Berhasil Get User Game History By Id");
    expect(body.result.user_id).toEqual("admin");
    expect(body.result.game_title).toEqual("admin");
    expect(body.result.game_lavel).toEqual("admin");
    expect(body.result.score).toEqual("admin");
    expect(body.result.waktu).toEqual("admin");
  });

  test("run /api/get-user-games-history/:id To Find One User Games History with unknown ID and Fail", async () => {
    const { body, statusCode } = await request(app)
      .get("/api/get-user-games-history/100")
      .set({ Authorization: token });
    expect(statusCode).toEqual(404);
    expect(body.message).toEqual(
      "User Game History dengan ID 100 Tidak di temukan"
    );
  });

  test("run /api/get-user-games-history/:id To Find One User Games History By ID without Auth and Fail", async () => {
    const { statusCode, error } = await request(app).get(
      "/api/get-user-games-history/3"
    );
    expect(statusCode).toEqual(403);
    expect(error.text).toEqual("A token is required for authentication");
  });

  test("run /api/create-user-games-history To Create User Games History Data with Auth", async () => {
    const { body, statusCode } = await request(app)
      .post("/api/create-user-games-history")
      .set({ Authorization: token })
      .send({
        user_id: "3",
        game_title: "Lempar Bola Basket",
        game_level: "2",
        score: "53",
        waktu: "15:00-15:02 WIB",
      });

    expect(statusCode).toEqual(200);
    expect(body.message).toEqual("Berhasil Membuat User Game History");
    expect(body.result.user_id).toEqual("4");
    expect(body.result.game_title).toEqual("Lempar Bola Basket");
    expect(body.result.game_level).toEqual("2");
    expect(body.result.game_level).toEqual("53");
    expect(body.result.waktu).toEqual(body.result.waktu);
  });

  test("run /api/create-user-games-history To Create Already Exist User Games History Data and Fail", async () => {
    const { body, statusCode } = await request(app)
      .post("/api/create-user-games-history")
      .set({ Authorization: token })
      .send({
        user_id: "3",
        game_title: "Lempar Bola Basket",
        game_level: "2",
        score: "53",
        waktu: "15:00-15:02 WIB",
      });
    expect(statusCode).toEqual(500);
    expect(body.message).toEqual("Gagal Create User Game History");
    expect(body.err).toEqual(
      "Validation error: user_id Telah digunakan!,\nValidation error: Waktu Telah digunakan!"
    );
  });

  test("run /api/create-user-games-history To Create User Games History Data without Auth and Fail", async () => {
    const { statusCode, error } = await request(app)
      .post("/api/create-user-game-history")
      .send({
        user_id: "4",
        game_title: "Lempar Bola Basket",
        game_level: "3",
        score: "53",
        waktu: "15:00-15:02 WIB",
      });
    expect(statusCode).toEqual(403);
    expect(error.text).toEqual("A token is required for authentication");
  });

  test("run /api/update-user-games-history/:id To Update User Games History Data with Auth", async () => {
    const { body, statusCode } = await request(app)
      .put("/api/update-user-games-history/3")
      .set({ Authorization: token })
      .send({
        user_id: "3",
        game_title: "Lempar Bola Basket",
        game_level: "2",
        score: "55",
        waktu: "15:00-15:02 WIB",
      });
    expect(statusCode).toEqual(200);
    expect(body.message).toEqual("Berhasil Mengupdate User Game History");
    expect(body.result).toEqual([1]);
  });

  test("run /api/update-user-games-history/:id To Update User Games History Data without Auth and Fail", async () => {
    const { statusCode, error } = await request(app)
      .put("/api/update-user-games-history/3")
      .send({
        user_id: "3",
        game_title: "Lempar Bola Basket",
        game_level: "2",
        score: "56",
        waktu: "15:00-15:02 WIB",
      });
    expect(statusCode).toEqual(403);
    expect(error.text).toEqual("A token is required for authentication");
  });

  test("run /api/delete-user-games-history/:id To Delete User Games History Data with Auth", async () => {
    const { body, statusCode } = await request(app)
      .delete("/api/delete-user-games-history/1")
      .set({ Authorization: token });
    expect(statusCode).toEqual(200);
    expect(body.message).toEqual("Berhasil Menghapus User Game History");
    expect(body.result).toEqual(1);
  });

  test("run /api/delete-user-games-history/:id To Delete User Games History with unknown ID and Fail", async () => {
    const { body, statusCode } = await request(app)
      .delete("elete-user-games-history/100")
      .set({ Authorization: token });
    expect(statusCode).toEqual(404);
    expect(body.message).toEqual(
      "User Game History dengan ID 100 Tidak di temukan"
    );
    expect(body.result).toEqual(0);
  });

  test("run /api/delete-user-games-history/:id To Delete User Games History Data without Auth and Fail", async () => {
    const { statusCode, error } = await request(app).delete(
      "/api/delete-user-games-history/2"
    );
    expect(statusCode).toEqual(403);
    expect(error.text).toEqual("A token is required for authentication");
  });
});
