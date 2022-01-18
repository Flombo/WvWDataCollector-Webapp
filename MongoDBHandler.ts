const { MongoClient } = require('mongodb');
const client = new MongoClient('mongodb://141.28.73.145:27017/');
const { DateTime } = require("luxon");

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

    public async retrieveVictoryMetrics(dbName : string, filter : string) : Promise<string> {

        const result = await this.mongoDBConnection.db(dbName).collection("victorymetrics").find(MongoDBHandler.getIntervalFilter(filter));

        return result.toArray();
    }

    public async retrieveBonuses(dbName : string, filter : string) : Promise<string> {

        const result = await this.mongoDBConnection.db(dbName).collection("mapbonuses").find(MongoDBHandler.getIntervalFilter(filter));

        return result.toArray();
    }

    public retrieveTotalFlips(dbName : string, filter : string) : Promise<string> {

        const result = this.mongoDBConnection.db(dbName).collection("totalflips").find(MongoDBHandler.getIntervalFilter(filter));

        return result.toArray();
    }

    public async retrievePeakTime(dbName : string, filter : string) : Promise<string>{

        const result = await this.mongoDBConnection.db(dbName).collection("peaktime").find(MongoDBHandler.getIntervalFilter(filter));

        return result.toArray();
    }

    public close() {
        this.mongoDBConnection.close();
    }

    private static getIntervalFilter(filter : string) : Object {

        const intervalTimestamps : Array<string> = this.getIntervalTimestampsByFilter(filter);

        return {
            timestamp: {
                $gte: intervalTimestamps[0],
                $lte: intervalTimestamps[1]
            }
        };
    }

    private static getIntervalTimestampsByFilter(filter : string) : Array<string> {
        let intervalTimestamps : Array<string> =  [];
        const endTimestamp = DateTime.now();
        let startTimestamp = endTimestamp;

        switch (filter) {
            case 'hour':
                intervalTimestamps.push(startTimestamp.minus({hours : 1}).toString());
                break;
            case 'day':
                intervalTimestamps.push(startTimestamp.minus({days : 1}).toString());
                break;
            case 'week':
                intervalTimestamps.push(startTimestamp.minus({days : 7}).toString());
                break;
        }

        intervalTimestamps.push(endTimestamp.toString());

        return intervalTimestamps;
    }

}

module.exports = new MongoDBHandler();