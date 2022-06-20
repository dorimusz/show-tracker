const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

const startDB = async () => {
    const server = await MongoMemoryServer.create();
    const uri = server.getUri();
    const connection = await mongoose.connect(uri);
    return [server, connection]
}

//számít a sorrend, a getDashboardon csekkold
const stopDB = async (server, connection) => {
    // The Server can be stopped again with
    await connection.disconnect();
    await server.stop();
}

const deleteAll = async (...collections) => {
    // for (const collection of collections) {
    //     await collection.deleteMany()
    // }
    const promises = collections.map(collection => collection.deleteMany()) //
    await Promise.all(promises); //egy listányi collectionből(mindegyikből) csinál egy ígéretet és várjuk, hogy beteljesüljön
}

module.exports = { startDB, stopDB, deleteAll }