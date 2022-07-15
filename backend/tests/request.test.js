require('dotenv').config();
const app = require('../app');
const mockserver = require('supertest');
const User = require('../models/user');
const { startDB, stopDB, deleteAll } = require('./util/inMemoryDB');
const jwt = require("jsonwebtoken");

describe('/api/request GET tests', () => {
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

    test('Should return 200 and response body containing all show requests.', async () => {
        //given
        const newUser = new User({ username: 'Fuego', providers: { oid: '12345' }, watchlist: [] });
        await newUser.save();
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET)
        client.set('authorization', token);

        // when
        const response = await client.get('/api/request');

        // then
        expect(response.status).toBe(200);
        expect(response.body).toEqual([]);
    });
});

describe('/api/request POST tests', () => {
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
        stopDB(server, connection) //akár ez is lehet async/await
    })

    test('Should return 400 when request sent without body.', async () => {
        //given
        const newUser = new User({ username: 'Fuego', providers: { oid: '12345' }, watchlist: [] });
        await newUser.save();
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET)
        client.set('authorization', token);

        // when
        const response = await client.post('/api/request');

        // then
        expect(response.status).toBe(400);
        expect(response.error.text).toBe("Nice try");
    });

    test('Should return 400 when request body sent (with comment, but) without title.', async () => {
        //given
        const newUser = new User({ username: 'Fuego', providers: { oid: '12345' }, watchlist: [] });
        await newUser.save();
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET)
        client.set('authorization', token);
        const comment = "just a comment";

        // when
        const response = await client.post('/api/request').send({ comment });

        // then
        expect(response.status).toBe(400);
        expect(response.error.text).toBe("Title is required");
    });

    test('Should return 200 and response contains \'Thank you for your request, we\'ll check it soon!\'.', async () => {
        //given
        const newUser = new User({ username: 'Fuego', providers: { oid: '12345' }, watchlist: [] });
        await newUser.save();
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET)
        client.set('authorization', token);
        const title = "Title of desired show";
        const comment = "just a comment";

        // when
        const response = await client.post('/api/request').send({ title, comment });

        // then
        expect(response.status).toBe(200);
        expect(response.text).toBe("\"Thank you for your request, we'll check it soon!\"");
    });
});