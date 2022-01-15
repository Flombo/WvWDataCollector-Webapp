const express = require('express');
const app = express();
const http = require('http');
const MongoDBHandler = require("./MongoDBHandler");
const server = http.createServer(app);

app.get('/victorymetrics', async (req, res) => {
    let databasename = req.query.databaseName;
    let result = await MongoDBHandler.retrieveVictoryMetrics(databasename).toArray();
    res.send(result);
});

app.get('/peaktime', async(req, res) => {
    let databaseName = req.query.databaseName;
    let result = await MongoDBHandler.retrievePeakTime(databaseName).toArray();
    res.send(result);
});

app.get('/bonuses', async(req, res) => {
    let databaseName = req.query.databaseName;
    let result = await MongoDBHandler.retrieveBonuses(databaseName).toArray();
    res.send(result);
});

app.get('/totalflips', async(req, res) => {
    let databaseName = req.query.databaseName;
    let result = await MongoDBHandler.retrieveTotalFlips(databaseName).toArray();
    res.send(result);
});

server.listen(3000, '141.28.73.145');