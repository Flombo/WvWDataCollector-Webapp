const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { MongoClient } = require('mongodb');
const client = new MongoClient('mongodb://141.28.73.145:27017');

app.get('/', async (req, res) => {
    try {
        let mongoDBConnection = await client.connect();
        const db = mongoDBConnection.db('test');
        console.log(db);
        await mongoDBConnection.close();
    } catch (exception) {
        console.log(exception);
    }
});

server.listen(3000, '141.28.73.145');
