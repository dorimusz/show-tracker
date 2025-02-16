require('dotenv').config();
const app = require('../app');
const mockserver = require('supertest');
const User = require('../models/user');
const { startDB, stopDB, deleteAll } = require('./util/inMemoryDB');
const jwt = require("jsonwebtoken");

describe('/api/watchlist GET tests', () => {
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
        const response = await client.get('/api/watchlist');

        // then
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ "watchlist": [] });
    });

    test('Should return 200 and response body a single show by id.', async () => {
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
        const showid = '123'

        // when
        const response = await client.get(`/api/watchlist/show/${showid}`);

        // then
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("showId");
    });
});

describe('/api/watchlist POST tests', () => {
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

    test('Should return 400 when request sent without body.', async () => {
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
        const response = await client.post('/api/watchlist');

        // then
        expect(response.status).toBe(400);
        expect(response.error.text).toBe("Nice try");
    });

    test('Should return 409 when request sent with an already existing show (by showid).', async () => {
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
        const showId = '123';
        const show = {
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
        };
        const episodes = [{ "id": 841634, "url": "https://www.tvmaze.com/episodes/841634/arrow-blood-rush-1x01-mr-queen-is-unavailable", "name": "Mr. Queen is Unavailable", "season": 1, "number": 1, "type": "regular", "airdate": "2013-11-06", "airtime": "20:00", "airstamp": "2013-11-07T01:00:00+00:00", "runtime": 1, "rating": { "average": 8.5 }, "image": null, "summary": "<p>Roy Harper came to meet Oliver Queen but Felicity Smoak tells him to wait as Oliver is not available.</p>", "_links": { "self": { "href": "https://api.tvmaze.com/episodes/841634" } } }, { "id": 841635, "url": "https://www.tvmaze.com/episodes/841635/arrow-blood-rush-1x02-roy-to-the-rescue", "name": "Roy to the Rescue", "season": 1, "number": 2, "type": "regular", "airdate": "2013-11-13", "airtime": "20:00", "airstamp": "2013-11-14T01:00:00+00:00", "runtime": 1, "rating": { "average": 8.5 }, "image": null, "summary": "<p>Detective Lance calls Felicity telling her that SCPD Laboratory is having blood samples of The Arrow then Felicity gives Roy Harper a job to break in SCPD Laboratory and get the samples.</p>", "_links": { "self": { "href": "https://api.tvmaze.com/episodes/841635" } } }, { "id": 841636, "url": "https://www.tvmaze.com/episodes/841636/arrow-blood-rush-1x03-down-the-rabbit-hole", "name": "Down the Rabbit Hole", "season": 1, "number": 3, "type": "regular", "airdate": "2013-11-20", "airtime": "20:00", "airstamp": "2013-11-21T01:00:00+00:00", "runtime": 1, "rating": { "average": 8.5 }, "image": null, "summary": "<p>Roy Harper breaks in SCPD Laboratory to get blood samples of The Arrow.</p>", "_links": { "self": { "href": "https://api.tvmaze.com/episodes/841636" } } }]

        // when
        const response = await client.post('/api/watchlist').send({ showId, show, episodes });

        // then
        expect(response.status).toBe(409);
    });

    test('Should return 200 and add show to watchlist when request sent with proper data and the tv show is not on the list yet.', async () => {
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
            ]
        });
        await newUser.save();
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET)
        client.set('authorization', token);
        const showId = '123';
        const show = {
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
        };
        const episodes = [{ "id": 841634, "url": "https://www.tvmaze.com/episodes/841634/arrow-blood-rush-1x01-mr-queen-is-unavailable", "name": "Mr. Queen is Unavailable", "season": 1, "number": 1, "type": "regular", "airdate": "2013-11-06", "airtime": "20:00", "airstamp": "2013-11-07T01:00:00+00:00", "runtime": 1, "rating": { "average": 8.5 }, "image": null, "summary": "<p>Roy Harper came to meet Oliver Queen but Felicity Smoak tells him to wait as Oliver is not available.</p>", "_links": { "self": { "href": "https://api.tvmaze.com/episodes/841634" } } }, { "id": 841635, "url": "https://www.tvmaze.com/episodes/841635/arrow-blood-rush-1x02-roy-to-the-rescue", "name": "Roy to the Rescue", "season": 1, "number": 2, "type": "regular", "airdate": "2013-11-13", "airtime": "20:00", "airstamp": "2013-11-14T01:00:00+00:00", "runtime": 1, "rating": { "average": 8.5 }, "image": null, "summary": "<p>Detective Lance calls Felicity telling her that SCPD Laboratory is having blood samples of The Arrow then Felicity gives Roy Harper a job to break in SCPD Laboratory and get the samples.</p>", "_links": { "self": { "href": "https://api.tvmaze.com/episodes/841635" } } }, { "id": 841636, "url": "https://www.tvmaze.com/episodes/841636/arrow-blood-rush-1x03-down-the-rabbit-hole", "name": "Down the Rabbit Hole", "season": 1, "number": 3, "type": "regular", "airdate": "2013-11-20", "airtime": "20:00", "airstamp": "2013-11-21T01:00:00+00:00", "runtime": 1, "rating": { "average": 8.5 }, "image": null, "summary": "<p>Roy Harper breaks in SCPD Laboratory to get blood samples of The Arrow.</p>", "_links": { "self": { "href": "https://api.tvmaze.com/episodes/841636" } } }]

        // when
        const response = await client.post('/api/watchlist').send({ showId, show, episodes });

        // then
        expect(response.status).toBe(200);
    });
});

describe('/api/watchlist PATCH tests', () => {
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

    test('Should return 400 when patch request sent without body.', async () => {
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
        const response = await client.patch('/api/watchlist');

        // then
        expect(response.status).toBe(400);
        expect(response.error.text).toBe("Nice try");
    });

    test('Should return 200 (and update the tv show\'s episode to watched) when request sent with proper data.', async () => {
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
                    seasons: [{ "id": 1543177, "name": "The Face of Hope", "season": 1, "number": 1, "airdate": "2009-09-13", "airtime": "", "airstamp": "2009-09-13T16:00:00+00:00", "runtime": 25, "rating": { "average": null }, "image": null, "summary": null, "_links": { "self": { "href": "https://api.tvmaze.com/episodes/1543177" } } }, { "id": 1543178, "url": "https://www.tvmaze.com/episodes/1543178/the-foundation-1x02-stamina-across-canada", "name": "Stamina Across Canada", "season": 1, "number": 2, "type": "regular", "airdate": "2009-09-20", "airtime": "", "airstamp": "2009-09-20T16:00:00+00:00", "runtime": 25, "rating": { "average": null }, "image": null, "summary": null, "_links": { "self": { "href": "https://api.tvmaze.com/episodes/1543178" } } }],
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
                    seasons: [{ "id": 841634, "url": "https://www.tvmaze.com/episodes/841634/arrow-blood-rush-1x01-mr-queen-is-unavailable", "name": "Mr. Queen is Unavailable", "season": 1, "number": 1, "type": "regular", "airdate": "2013-11-06", "airtime": "20:00", "airstamp": "2013-11-07T01:00:00+00:00", "runtime": 1, "rating": { "average": 8.5 }, "image": null, "summary": "<p>Roy Harper came to meet Oliver Queen but Felicity Smoak tells him to wait as Oliver is not available.</p>", "_links": { "self": { "href": "https://api.tvmaze.com/episodes/841634", '_id': "62ce7e09ee948802ca724b06" } } }, { "id": 841635, "url": "https://www.tvmaze.com/episodes/841635/arrow-blood-rush-1x02-roy-to-the-rescue", "name": "Roy to the Rescue", "season": 1, "number": 2, "type": "regular", "airdate": "2013-11-13", "airtime": "20:00", "airstamp": "2013-11-14T01:00:00+00:00", "runtime": 1, "rating": { "average": 8.5 }, "image": null, "summary": "<p>Detective Lance calls Felicity telling her that SCPD Laboratory is having blood samples of The Arrow then Felicity gives Roy Harper a job to break in SCPD Laboratory and get the samples.</p>", "_links": { "self": { "href": "https://api.tvmaze.com/episodes/841635" } } }],
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
        const epId = "62ce7e09ee948802ca724b06"


        // when
        const response = await client.patch('/api/watchlist').send({ showId, id: epId });

        // then
        expect(response.status).toBe(200);
    });
});

describe('/api/watchlist DELETE tests', () => {
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

    test('Should return 400 when delete request sent without data in body.', async () => {
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
        const response = await client.delete('/api/watchlist');

        // then
        expect(response.status).toBe(400);
        expect(response.error.text).toBe("Nice try");
    });
});
