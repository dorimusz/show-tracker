
require('dotenv').config();
const app = require('../app');
const mockserver = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const User = require('../models/user');
const { startDB, stopDB, deleteAll } = require('./util/inMemoryDB');
const jwt = require("jsonwebtoken");;

describe('/api/user/login POST test', () => {
    //ide kerül sok-sok teszteset
    let connection;
    let mongod;
    let client;

    beforeAll(async () => {
        // [server, connection] = await startDB;
        const result = await startDB();
        server = result[0]
        connection = result[1]
        client = mockserver.agent(app);

    })

    afterEach(async () => {
        await deleteAll(User)
    })

    afterAll(() => {
        stopDB(server, connection) //akár ez is lehet async/await
    })

    //OK
    test('returns jwt token with provider data (user not created in db)', async () => {
        //given
        const code = "random";
        const provider = "github";

        // when
        const response = await client.post('/api/user/login').send(
            { code, provider }
        );

        // then
        expect(response.status).toBe(200);
        // expect(responseData.user.dashboards).toStrictEqual([]);
    });

    test('should return 400 without body (user not created))', async () => {
        //given

        // when
        const response = await client.post('/api/user/login');

        // then
        expect(response.status).toBe(400);
        // expect(responseData.user.dashboards).toStrictEqual([]);
    });

    //OK
    test('should return 400 without provider)', async () => {
        //given
        const code = "random";;

        // when
        const response = await client.post('/api/user/login').send({ code });

        // then
        expect(response.status).toBe(400);
    });

    //OK
    test('should return 400 without code)', async () => {
        //given
        const provider = "github";

        // when
        const response = await client.post('/api/user/login').send({ provider });

        // then
        expect(response.status).toBe(400);
    });

    //OK
    test('should return 400 with invalid provider (user not created))', async () => {
        //given
        const code = "random";
        const provider = "gitthubb";

        // when
        const response = await client.post('/api/user/login').send({ code, provider });

        // then
        expect(response.status).toBe(400);
    });
})