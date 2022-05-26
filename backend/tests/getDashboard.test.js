const app = require('../app')
const mockserver = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const User = require('../models/user')

test('new user gets empty list', async () => {
    //given
    // This will create an new instance of "MongoMemoryServer" and automatically start it
    const mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    const connection = await mongoose.connect(uri);

    const newUser = new User({ username: 'Fuego', googleID: '123456' });
    const client = mockserver.agent(app);
    await newUser.save();
    client.set('authorization', newUser._id);

    // when
    const response = await client.get('/api/dashboards');

    // then
    expect(response.status).toBe(200);
    const responseData = response.body;
    expect(responseData.user.dashboards).toStrictEqual([]);
    // The Server can be stopped again with
    await connection.disconnect();
    await mongod.stop();
})