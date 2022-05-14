// /** @format */

// const { user_game_biodata } = require("../models");
// require("../controller/user_game_biodata_api");
// const request = require('supertest');
// const app = require('../app');

// describe('User Games Biodata API Biodata Controller Testing', () => {
//   beforeAll(async () => {
//     await request(app).post('/api/register').send({ user_id: '3', name_user: 'ester', gender: 'perempuan', email: 'ester.yul@gmail.com' });
//     const login = await request(app).post('/api/login').send({ user_id: '3', name_user: 'ester', gender: 'perempuan', email: 'ester.yul@gmail.com' });
//     token = login.body.token;
//   });

//   afterAll(async () => {
//     await user_game_biodata.destroy({ where: { user_id: '3' } });
//   });

//   test('run /api/get-users-games-biodata To Get All User Games Biodata with Auth', async () => {
//     const inputuser_game_biodata = await user_game_biodata.create({  user_id: '3', name_user: 'ester', gender: 'perempuan', email: 'ester.yul@gmail.com' });

//     const { body, statusCode } = await request(app).get('/api/get-users-games-biodata').set({ Authorization: token });
//     expect(statusCode).toEqual(200);
//     expect(body.message).toEqual('Berhasil Get All User Game Biodata');
//     expect(body.result[body.result.length - 1].user_id).toEqual(inputuser_game_biodata.user_id);
//     expect(body.result[body.result.length - 1].user_name).toEqual(inputuser_game_biodata.user_name);
//     expect(body.result[body.result.length - 1].gender).toEqual(inputuser_game_biodata.gender);
//     expect(body.result[body.result.length - 1].email).toEqual(inputuser_game_biodata.email);
//     expect(body.result).toHaveLength(4);

//   });

//   test('run /api/get-users-games-biodata To Get All User Games Biodata without Auth and Fail', async () => {
//     const { statusCode, error } = await request(app).get('/api/get-users-games-biodata');
//     expect(statusCode).toEqual(403);
//     expect(error.text).toEqual('A token is required for authentication');
//   });

  
//   test('run /api/get-user-games-biodata/:id To Find One User Games Biodata By ID with Auth', async () => {
//     const { body, statusCode } = await request(app).get('/api/get-users-games-biodata/3').set({ Authorization: token });
//     expect(statusCode).toEqual(200);
//     expect(body.message).toEqual('Berhasil Get User Game Biodata By Id');
//     expect(body.result.user_id).toEqual('admin');
//     expect(body.result.user_name).toEqual('admin');
//     expect(body.result.gender).toEqual('admin');
//     expect(body.result.email).toEqual('admin');
//   });

//   test('run /api/get-user-games-biodata/:id To Find One User Games Biodata with unknown ID and Fail', async () => {
//     const { body, statusCode } = await request(app).get('/api/get-user-games/100').set({ Authorization: token });
//     expect(statusCode).toEqual(404);
//     expect(body.message).toEqual('User Game Biodata dengan ID 100 Tidak di temukan');
//   });

//   test('run /api/get-user-games-biodata/:id To Find One User Games Biodata By ID without Auth and Fail', async () => {
//     const { statusCode, error } = await request(app).get('/api/get-user-games-biodata/3');
//     expect(statusCode).toEqual(403);
//     expect(error.text).toEqual('A token is required for authentication');
//   });

//   test('run /api/create-user-games-biodata To Create User Games Biodata Data with Auth', async () => {
//     const { body, statusCode } = await request(app)
//       .post('/api/create-users-games-biodata')
//       .set({ Authorization: token })
//       .send({ user_id: '3', user_name: 'ester', gender: 'perempuan', email : 'ester.yul@gmail.com' });
//     expect(statusCode).toEqual(200);
//     expect(body.message).toEqual('Berhasil Membuat User Game Biodata');
//     expect(body.result.user_id).toEqual('3');
//     expect(body.result.user_name).toEqual('ester');
//     expect(body.result.gender).toEqual('perempuan');
//     expect(body.result.email).toEqual('ester.yul@gmalil.com');
//   });

//   test('run /api/create-user-games-biodata To Create Already Exist User Games Biodata Data and Fail', async () => {
//     const { body, statusCode } = await request(app)
//       .post('/api/create-user-games-biodata')
//       .set({ Authorization: token })
//       .send({ user_id: '3', user_name: 'ester', gender: 'perempuan', email : 'ester.yul@gmail.com' });
//     expect(statusCode).toEqual(500);
//     expect(body.message).toEqual('Gagal Create User Game Biodata');
//     expect(body.err).toEqual('Validation error: User ID Telah digunakan!,\nValidation error: Email Telah digunakan!');
//   });

//   test('run /api/create-user-games-biodata To Create User Games Biodata Data without Auth and Fail', async () => {
//     const { statusCode, error } = await request(app)
//       .post('/api/create-user-games-biodata')
//       .send({ user_id: '4', user_name: 'malton', gender: 'Laki-laki', email : 'malton.sgl@gmail.com' });
//     expect(statusCode).toEqual(403);
//     expect(error.text).toEqual('A token is required for authentication');
//   });

//   test('run /api/update-user-games-biodata/:id To Update User Games Biodata Data with Auth', async () => {
//     const { body, statusCode } = await request(app)
//       .put('/api/update-user-games-biodata/3')
//       .set({ Authorization: token })
//       .send({ user_id: '3', user_name: 'ester', gender: 'perempuan', email : 'ester.sgl@gmail.com' });
//     expect(statusCode).toEqual(200);
//     expect(body.message).toEqual('Berhasil Mengupdate User Game Bioddata');
//     expect(body.result).toEqual([1]);
//   });

//   test('run /api/update-user-games-biodata/:id To Update User Games Biodata Data without Auth and Fail', async () => {
//     const { statusCode, error } = await request(app)
//       .put('/api/update-user-games-biodata/3')
//       .send({ user_id: '3', user_name: 'ester', gender: 'perempuan', email : 'ester.yuliana@gmail.com' });
//     expect(statusCode).toEqual(403);
//     expect(error.text).toEqual('A token is required for authentication');
//   });

//   test('run /api/delete-user-games/:id To Delete User Games Biodata Data with Auth', async () => {
//     const { body, statusCode } = await request(app).delete('/api/delete-user-games/2').set({ Authorization: token });
//     expect(statusCode).toEqual(200);
//     expect(body.message).toEqual('Berhasil Menghapus User Game Biodata');
//     expect(body.result).toEqual(1);
//   });

//   test('run /api/delete-user-games-biodata/:id To Delete User Games Biodata with unknown ID and Fail', async () => {
//     const { body, statusCode } = await request(app).delete('/api/delete-user-games-biodata/100').set({ Authorization: token });
//     expect(statusCode).toEqual(404);
//     expect(body.message).toEqual('User Game Bioda dengan ID 100 Tidak di temukan');
//     expect(body.result).toEqual(0);
//   });

//   test('run /api/delete-user-games-biodata/:id To Delete User Games Data without Auth and Fail', async () => {
//     const { statusCode, error } = await request(app).delete('/api/delete-user-games-biodata/2');
//     expect(statusCode).toEqual(403);
//     expect(error.text).toEqual('A token is required for authentication');
//   });
// });