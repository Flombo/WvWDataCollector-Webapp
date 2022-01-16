const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const http = require('http');
const MongoDBHandler = require("./MongoDBHandler");
const server = http.createServer(app);
app.set('view engine', 'ejs');
app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.render('index.ejs');
})

app.post('/victorymetrics', async (req, res) => {
    let databasename = req.body.databaseName;
    let result = await MongoDBHandler.retrieveVictoryMetrics(databasename).toArray();
    res.json({victorymetrics : result});
});

app.post('/peaktime', async(req, res) => {
    let databaseName = req.body.databaseName;
    let result = await MongoDBHandler.retrievePeakTime(databaseName).toArray();
    res.send(result);
});

app.post('/bonuses', async(req, res) => {
    let databaseName = req.body.databaseName;
    let result = await MongoDBHandler.retrieveBonuses(databaseName).toArray();
    res.send(result);
});

app.post('/totalflips', async(req, res) => {
    let databaseName = req.body.databaseName;
    let result = await MongoDBHandler.retrieveTotalFlips(databaseName).toArray();
    res.send(result);
});

server.listen(3000, '141.28.73.145');