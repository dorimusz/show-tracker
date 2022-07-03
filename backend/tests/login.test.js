
require('dotenv').config();
const app = require('../app');
const mockserver = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const User = require('../models/user');
const { startDB, stopDB, deleteAll } = require('./util/inMemoryDB');
const jwt = require("jsonwebtoken");
const { setupGoogleSuccessResponse, setupGoogleErrorResponse } = require('./util/httpMock')

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

    test('should return 400 without body (user not created))', async () => {
        //given

        // when
        const response = await client.post('/api/user/login');

        // then
        expect(response.status).toBe(400);
    });

    test('should return 400 without provider)', async () => {
        //given
        const code = "random";;

        // when
        const response = await client.post('/api/user/login').send({ code });

        // then
        expect(response.status).toBe(400);
    });

    test('should return 400 without code)', async () => {
        //given
        const provider = "github";

        // when
        const response = await client.post('/api/user/login').send({ provider });

        // then
        expect(response.status).toBe(400);
    });

    test('should return 400 with invalid provider (user not created))', async () => {
        //given
        const code = "random";
        const provider = "gitthubb";

        // when
        const response = await client.post('/api/user/login').send({ code, provider });

        // then
        expect(response.status).toBe(400);
    });

    test('should return 200 with JWT with valid provider (user not created))', async () => {
        //given
        const code = "random code is here";
        const provider = "google";
        const googleUserId = "1234dfgg5678gfd9987654edfgbn";
        setupGoogleSuccessResponse(googleUserId);

        // when
        const response = await client.post('/api/user/login').send({ code, provider });

        // then
        expect(response.status).toBe(200);
        const responseToken = jwt.decode(response.body.sessionToken);
        expect(responseToken.providers.google).toBe(googleUserId);

        const users = await User.find();
        expect(users).toStrictEqual([]);
    });

    test('should return 401 with invalid code (user not created))', async () => {
        //given
        const code = "random";
        const provider = "google";

        setupGoogleErrorResponse();

        // when
        const response = await client.post('/api/user/login').send({ code, provider });

        // then
        expect(response.status).toBe(401);
        expect(response.body).toStrictEqual({});

        const users = await User.find();
        expect(users).toStrictEqual([]);
    });
})

//"test": "jest --verbose --coverage",