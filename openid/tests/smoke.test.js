const app = require('../app')
const mockserver = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

/*
function sum(a, b) {
    return a + b;
}

test('adds 1 + 2 to equal 3, so jest IS WORKING YA BITCHES', () => {
    // given - more rows
    //no setup required

    // when - only one row
    const result = sum(1, 2);

    //then
    expect(result).toBe(3)
})
*/

test('random endpoint gives back status 404', async () => {
    //given
    const server = mockserver(app); //nem app.listen, hanem odaadjunk ezt a szép objectet a mockservernek

    // when
    const response = await server.get('/api/random');

    //then
    expect(response.status).toBe(404)
});

test('mongo inmemory server is working', async () => {
    //given
    // This will create an new instance of "MongoMemoryServer" and automatically start it
    const mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    const connection = await mongoose.connect(uri);

    const Cat = mongoose.model('Cat', { name: String });
    const kitty = new Cat({ name: 'Fuego' });

    // when
    await kitty.save();

    // then
    const findCat = await Cat.findOne();
    expect(findCat.name).toBe('Fuego');
    // The Server can be stopped again with
    await connection.disconnect();
    await mongod.stop();
})