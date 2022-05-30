const app = require('../app')
const mockserver = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const User = require('../models/user')
const { startDB, stopDB, deleteAll } = require('./util/inMemoryDB')

describe('/api/dashboards get tests', () => {
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

    test('new user gets back an empty dashboard list', async () => {
        //given
        const newUser = new User({ username: 'Fuego', googleID: '123456' });
        await newUser.save();
        client.set('authorization', newUser._id);

        // when
        const response = await client.get('/api/dashboards');

        // then
        expect(response.status).toBe(200);
        const responseData = response.body;
        expect(responseData.user.dashboards).toStrictEqual([]);
    });

    test('deleted user receives nothing/null', async () => {
        const newUser = new User({ username: 'Fuego', googleID: '123456' });
        await newUser.save();
        client.set('authorization', newUser._id);
        await User.deleteMany();

        // when
        const response = await client.get('/api/dashboards');

        // then
        expect(response.status).toBe(200);
        const responseData = response.body;
        expect(responseData.user).toBeNull();
    })

})