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

    public async retrieveVictoryMetrics(dbName : string, filter : string, datetime : string) : Promise<string> {

        const result = await this.mongoDBConnection.db(dbName).collection("victorymetrics").find(await this.getIntervalFilter(filter, dbName, datetime,"victorymetrics"));

        return result.toArray();
    }

    public async retrieveBonuses(dbName : string, filter : string, datetime : string) : Promise<string> {

        const result = await this.mongoDBConnection.db(dbName).collection("mapbonuses").find(await this.getIntervalFilter(filter, dbName, datetime,"mapbonuses"));

        return result.toArray();
    }

    public async retrieveTotalFlips(dbName : string, filter : string, datetime : string) : Promise<string> {

        const result = this.mongoDBConnection.db(dbName).collection("totalflips").find(await this.getIntervalFilter(filter, dbName, datetime, "totalflips"));

        return result.toArray();
    }

    public async retrievePeakTime(dbName : string, filter : string, datetime : string) : Promise<string>{

        const result = await this.mongoDBConnection.db(dbName).collection("peaktime").find(await this.getIntervalFilter(filter, dbName, datetime,"peaktime"));

        return result.toArray();
    }

    public close() {
        this.mongoDBConnection.close();
    }

    private async getIntervalFilter(filter : string, dbName : string, datetime : string, collectionName : string) : Promise<Object> {

        const intervalTimestamps : Array<string> = await this.getIntervalTimestampsByFilter(filter, dbName, datetime, collectionName);

        return {
            timestamp: {
                $gte: intervalTimestamps[0],
                $lte: intervalTimestamps[1]
            }
        };
    }

    private async getIntervalTimestampsByFilter(filter : string, dbName : string, datetime : string, collectionName : string) : Promise<Array<string>> {
        let intervalTimestamps : Array<string> =  [];
        let endTimestamp = DateTime.now();

        if(datetime !== undefined && datetime.length > 0 && DateTime.fromISO(datetime) !== undefined) {
            endTimestamp = DateTime.fromISO(datetime);
        }

        let startTimestamp = endTimestamp;

        switch (filter) {
            case 'Hour':
                intervalTimestamps.push(startTimestamp.minus({hours : 1}).toString());
                break;
            case 'Day':
                intervalTimestamps.push(startTimestamp.minus({days : 1}).toString());
                break;
            case 'Week':
                intervalTimestamps.push(startTimestamp.minus({days : 7}).toString());
                break;
            case 'Match':
                const documentCursor = await this.mongoDBConnection.db(dbName).collection(collectionName).find().sort({_id:-1}).limit(1);
                let document = await documentCursor.next();
                intervalTimestamps.push(document.starttime);
                endTimestamp = document.endtime;
                break;
        }

        intervalTimestamps.push(endTimestamp.toString());

        return intervalTimestamps;
    }

}

module.exports = new MongoDBHandler();