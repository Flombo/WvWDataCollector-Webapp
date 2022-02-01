const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const http = require('http');
const MongoDBHandler = require("./MongoDBHandler");
const server = http.createServer(app);
const ChartDataRetriever = require('./ChartDataRetriever');
app.set('view engine', 'ejs');
app.use(express.static(__dirname));

app.get('/', (req, res) => {

    let selection = { "selection" : 'vm' };

    if(req.query.viewselection !== undefined) {
        switch (req.query.viewselection) {
            case 'vm':
                selection.selection = 'vm';
                break;
            case 'pt':
                selection.selection = 'pt';
                break;
            case 'tp':
                selection.selection = 'tp';
                break;
            case 'mb':
                selection.selection = 'mb';
                break;
            case 'db':
                selection.selection = 'db';
                break;
        }
    }

    res.render('index.ejs', selection);
})

app.post('/victorymetrics', async (req, res) => {
    let databaseName = req.body.databaseName;
    let filter = req.body.filter;
    let datetime = req.body.datetime;
    let result = await MongoDBHandler.retrieveVictoryMetrics(databaseName, filter, datetime);
    const victoryMetrics = ChartDataRetriever.getVictoryMetrcisData(result);
    res.json({"victorymetrics" : victoryMetrics});
});

app.post('/peaktime', async(req, res) => {
    let databaseName = req.body.databaseName;
    let filter = req.body.filter;
    let datetime = req.body.datetime;
    let result = await MongoDBHandler.retrievePeakTime(databaseName, filter, datetime);
    const peaktime = ChartDataRetriever.getPeaktimeData(result);
    res.json({"peaktime" : peaktime});
});

app.post('/bonuses', async(req, res) => {
    let databaseName = req.body.databaseName;
    let filter = req.body.filter;
    let datetime = req.body.datetime;
    let result = await MongoDBHandler.retrieveBonuses(databaseName, filter, datetime);
    const mapbonuses = ChartDataRetriever.getMapBonusesData(result);
    res.json({"bonuses" : mapbonuses});
});

app.post('/totalflips', async(req, res) => {
    let databaseName = req.body.databaseName;
    let filter = req.body.filter;
    let datetime = req.body.datetime;
    let result = await MongoDBHandler.retrieveTotalFlips(databaseName, filter, datetime);
    const totalFlips = ChartDataRetriever.getTotalFlipsData(result);
    res.json({totalflips : totalFlips});
});

server.listen(3000, '141.28.73.145');