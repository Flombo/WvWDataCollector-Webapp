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
    let result = await MongoDBHandler.retrieveVictoryMetrics(databaseName, filter);
    res.json({victorymetrics : result});
});

app.post('/peaktime', async(req, res) => {
    let databaseName = req.body.databaseName;
    let filter = req.body.filter;
    let result = await MongoDBHandler.retrievePeakTime(databaseName, filter);
    res.send(result);
});

app.post('/bonuses', async(req, res) => {
    let databaseName = req.body.databaseName;
    let filter = req.body.filter;
    let result = await MongoDBHandler.retrieveBonuses(databaseName, filter);
    res.send(result);
});

app.post('/totalflips', async(req, res) => {
    let databaseName = req.body.databaseName;
    let filter = req.body.filter;
    let result = await MongoDBHandler.retrieveTotalFlips(databaseName, filter);
    res.send(result);
});

server.listen(3000, '141.28.73.145');