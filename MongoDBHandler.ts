const { MongoClient } = require('mongodb');
const client = new MongoClient('mongodb://141.28.73.145:27017/');

class MongoDBHandler {

    private mongoDBConnection;

    constructor() {
        if(this.mongoDBConnection === null || this.mongoDBConnection === undefined) {
            this.createMongoDBConnection();
        }
    }

    private async createMongoDBConnection() {
        this.mongoDBConnection = await client.connect();
    }

    public retrieveVictoryMetrics(dbName : string) : Promise<string> {
        return this.mongoDBConnection.db(dbName).collection("victorymetrics").find({});
    }

    public retrieveBonuses(dbName : string) : Promise<string> {
        return this.mongoDBConnection.db(dbName).collection("mapbonuses").find({});
    }

    public retrieveTotalFlips(dbName : string) : Promise<string> {
        return this.mongoDBConnection.db(dbName).collection("totalflips").find({});
    }

    public retrievePeakTime(dbName : string) : Promise<string>{
        return this.mongoDBConnection.db(dbName).collection("peaktime").find({});
    }

    public close() {
        this.mongoDBConnection.close();
    }

}

module.exports = new MongoDBHandler();