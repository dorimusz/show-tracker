require('dotenv').config();
const app = require('../app');
const mockserver = require('supertest');
const User = require('../models/user');
const { startDB, stopDB, deleteAll } = require('./util/inMemoryDB');
const jwt = require("jsonwebtoken");


describe('/api/myshows/manage GET tests', () => {
    let connection;
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

    test('Should return 200 and response body containing watchlist array', async () => {
        //given
        const newUser = new User({ username: 'Fuego', providers: { oid: '12345' }, watchlist: [] });
        await newUser.save();
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET)
        client.set('authorization', token);

        // when
        const response = await client.get('/api/myshows/manage');

        // then
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ "watchlist": [] });
    });
});

describe('/api/watchlist/manage PATCH tests', () => {
    let connection;
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

    test('Should return 400 when patch request to ignore show is sent without body.', async () => {
        //given
        const newUser = new User({
            username: 'Fuego', providers: { oid: '12345' }, watchlist: [
                {
                    genres: ['Comedy'],
                    image: "https://static.tvmaze.com/uploads/images/medium_portrait/170/426349.jpg",
                    isDeleted: false,
                    isIgnored: false,
                    name: "The Foundation",
                    network: "SHOWTIME Showcase",
                    runtime: "25",
                    seasons: [],
                    showId: "39012",
                    status: "Ended",
                    _id: "62ce7e09ee948802ca724b05",
                },
                {
                    genres: ['Drama', 'Action'],
                    image: "https://static.tvmaze.com/uploads/images/medium_portrait/63/157986.jpg",
                    isDeleted: true,
                    isIgnored: false,
                    name: "Arrow: Blood Rush",
                    network: "The CW",
                    runtime: "1",
                    seasons: [],
                    showId: "123",
                    status: "Ended",
                    _id: "62ced8a4662f84758b1a46cc",
                }
            ]
        });
        await newUser.save();
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET)
        client.set('authorization', token);

        // when
        const response = await client.patch('/api/myshows/manage/ignore');

        // then
        expect(response.status).toBe(400);
        expect(response.error.text).toBe("Nice try");
    });

    test('Should return 200 (and update the tv show\'s watched state when request sent with proper data.', async () => {
        //given
        const newUser = new User({
            username: 'Fuego', providers: { oid: '12345' }, watchlist: [
                {
                    genres: ['Comedy'],
                    image: "https://static.tvmaze.com/uploads/images/medium_portrait/170/426349.jpg",
                    isDeleted: false,
                    isIgnored: false,
                    name: "The Foundation",
                    network: "SHOWTIME Showcase",
                    runtime: "25",
                    seasons: [],
                    showId: "39012",
                    status: "Ended",
                    _id: "62ce7e09ee948802ca724b05",
                },
                {
                    genres: ['Drama', 'Action'],
                    image: "https://static.tvmaze.com/uploads/images/medium_portrait/63/157986.jpg",
                    isDeleted: false,
                    isIgnored: false,
                    name: "Arrow: Blood Rush",
                    network: "The CW",
                    runtime: "1",
                    seasons: [],
                    showId: "123",
                    status: "Ended",
                    _id: "62ced8a4662f84758b1a46cc",
                }
            ]
        });
        await newUser.save();
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET)
        client.set('authorization', token);
        const showId = '39012';

        // when
        const response = await client.patch('/api/myshows/manage/ignore').send({ showId });

        // then
        expect(response.status).toBe(200);
        // expect(response.body).toBe(true);
    });


    test('Should return 400 when patch request to unignore show sent without body.', async () => {
        //given
        const newUser = new User({
            username: 'Fuego', providers: { oid: '12345' }, watchlist: [
                {
                    genres: ['Comedy'],
                    image: "https://static.tvmaze.com/uploads/images/medium_portrait/170/426349.jpg",
                    isDeleted: false,
                    isIgnored: false,
                    name: "The Foundation",
                    network: "SHOWTIME Showcase",
                    runtime: "25",
                    seasons: [],
                    showId: "39012",
                    status: "Ended",
                    _id: "62ce7e09ee948802ca724b05",
                },
                {
                    genres: ['Drama', 'Action'],
                    image: "https://static.tvmaze.com/uploads/images/medium_portrait/63/157986.jpg",
                    isDeleted: true,
                    isIgnored: false,
                    name: "Arrow: Blood Rush",
                    network: "The CW",
                    runtime: "1",
                    seasons: [],
                    showId: "123",
                    status: "Ended",
                    _id: "62ced8a4662f84758b1a46cc",
                }
            ]
        });
        await newUser.save();
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET)
        client.set('authorization', token);

        // when
        const response = await client.patch('/api/myshows/manage/unignore');

        // then
        expect(response.status).toBe(400);
        expect(response.error.text).toBe("Nice try");
    });

    test('Should return 200 (and update the tv show\'s watched state when request sent with proper data.', async () => {
        //given
        const newUser = new User({
            username: 'Fuego', providers: { oid: '12345' }, watchlist: [
                {
                    genres: ['Comedy'],
                    image: "https://static.tvmaze.com/uploads/images/medium_portrait/170/426349.jpg",
                    isDeleted: false,
                    isIgnored: false,
                    name: "The Foundation",
                    network: "SHOWTIME Showcase",
                    runtime: "25",
                    seasons: [],
                    showId: "39012",
                    status: "Ended",
                    _id: "62ce7e09ee948802ca724b05",
                },
                {
                    genres: ['Drama', 'Action'],
                    image: "https://static.tvmaze.com/uploads/images/medium_portrait/63/157986.jpg",
                    isDeleted: false,
                    isIgnored: false,
                    name: "Arrow: Blood Rush",
                    network: "The CW",
                    runtime: "1",
                    seasons: [],
                    showId: "123",
                    status: "Ended",
                    _id: "62ced8a4662f84758b1a46cc",
                }
            ]
        });
        await newUser.save();
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET)
        client.set('authorization', token);
        const showId = '39012';

        // when
        const response = await client.patch('/api/myshows/manage/unignore').send({ showId });

        // then
        expect(response.status).toBe(200);
        // expect(response.body).toBe(true);
    });
});