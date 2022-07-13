
require('dotenv').config();
const app = require('../app');
const mockserver = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const User = require('../models/user');
const { startDB, stopDB, deleteAll } = require('./util/inMemoryDB');
const jwt = require("jsonwebtoken");
const { setupGoogleSuccessResponse, setupGoogleErrorResponse } = require('./util/httpMock')

describe('/api/user/login POST tests', () => {
    let connection;
    let mongod;
    let client;

    beforeAll(async () => {
        const result = await startDB();
        server = result[0]
        connection = result[1]
        client = mockserver.agent(app);
    })

    afterEach(async () => {
        await deleteAll(User)
    })

    afterAll(() => {
        stopDB(server, connection)
    })

    test('Should return 400 without req.body.', async () => {
        //given

        // when
        const response = await client.post('/api/user/login');

        // then
        expect(response.status).toBe(400);
    });

    test('Should return 400 without provider.', async () => {
        //given
        const code = "random";

        // when
        const response = await client.post('/api/user/login').send({ code });

        // then
        expect(response.status).toBe(400);
    });

    test('Should return 400 without code.', async () => {
        //given
        const provider = "google";

        // when
        const response = await client.post('/api/user/login').send({ provider });

        // then
        expect(response.status).toBe(400);
    });

    test('Should return 400 with invalid provider.', async () => {
        //given
        const provider = "googgle";
        const code = "random";

        // when
        const response = await client.post('/api/user/login').send({ provider, code });

        // then
        expect(response.status).toBe(400);
    });

    test('Should return 200 - with JWT and valid provider (User not created!).', async () => {
        //given
        const code = "random";
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
});

describe('/api/user/create POST tests', () => {
    let connection;
    let mongod;
    let client;

    beforeAll(async () => {
        const result = await startDB();
        server = result[0]
        connection = result[1]
        client = mockserver.agent(app);

    })

    afterEach(async () => {
        await deleteAll(User)
    })

    afterAll(() => {
        stopDB(server, connection)
    })

    test('Should return 401 without authentication (user not created).', async () => {
        //given

        // when
        const response = await client.post('/api/user/create');

        // then
        expect(response.status).toBe(401);
    });

    test('Should return 400 without req.body (user not created).', async () => {
        //given
        const newUser = new User({ username: 'Fuego', providers: { oid: '12345' }, watchlist: [] });
        await newUser.save();
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET)
        client.set('authorization', token);

        // when
        const response = await client.post('/api/user/create');

        // then
        expect(response.status).toBe(400);
    });

    test('Should return 200 with auth and username sent in body (user created).', async () => {
        //given
        const newUser = new User({ username: 'Fuego', providers: { oid: '12345' }, watchlist: [] });
        await newUser.save();
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET)
        client.set('authorization', token);
        const username = "drms"

        // when
        const response = await client.post('/api/user/create').send({ username });

        // then
        expect(response.status).toBe(200);
    });

    test('Should return {sessionToken} that contains user id (user created).', async () => {
        //given
        const newUser = new User({ username: 'Fuego', providers: { oid: '12345' }, watchlist: [] });
        await newUser.save();
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET)
        client.set('authorization', token);
        const username = "drms"

        // when
        const response = await client.post('/api/user/create').send({ username });

        // then
        expect(response.status).toBe(200);
        const responseToken = jwt.decode(response.body.sessionToken);
        expect(responseToken).toHaveProperty("userId");
    });
})

describe('/api/user GET request', () => {
    let connection;
    let mongod;
    let client;

    beforeAll(async () => {
        const result = await startDB();
        server = result[0]
        connection = result[1]
        client = mockserver.agent(app);
    })

    afterEach(async () => {
        await deleteAll(User)
    })

    afterAll(() => {
        stopDB(server, connection)
    })

    test('Should return user object.', async () => {
        //given
        const newUser = new User({ username: 'Fuego', providers: { oid: '12345' }, watchlist: [] });
        await newUser.save();
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET)
        client.set('authorization', token);

        // when
        const response = await client.get('/api/user');

        // then
        expect(response.status).toBe(200);
        expect(response.body.user).toHaveProperty("username");
    });
});
