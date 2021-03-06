var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var MongoClient = require('mongodb').MongoClient;
var client = new MongoClient('mongodb://141.28.73.145:27017/');
var DateTime = require("luxon").DateTime;
var MongoDBHandler = /** @class */ (function () {
    function MongoDBHandler() {
        if (this.mongoDBConnection === null || this.mongoDBConnection === undefined) {
            this.createMongoDBConnection();
        }
    }
    MongoDBHandler.prototype.createMongoDBConnection = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, client.connect()];
                    case 1:
                        _a.mongoDBConnection = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MongoDBHandler.prototype.retrieveVictoryMetrics = function (dbName, filter, datetime) {
        return __awaiter(this, void 0, void 0, function () {
            var result, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = (_a = this.mongoDBConnection.db(dbName).collection("victorymetrics")).find;
                        return [4 /*yield*/, this.getIntervalFilter(filter, dbName, datetime, "victorymetrics")];
                    case 1: return [4 /*yield*/, _b.apply(_a, [_c.sent()])];
                    case 2:
                        result = _c.sent();
                        return [2 /*return*/, result.toArray()];
                }
            });
        });
    };
    MongoDBHandler.prototype.retrieveBonuses = function (dbName, filter, datetime) {
        return __awaiter(this, void 0, void 0, function () {
            var result, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = (_a = this.mongoDBConnection.db(dbName).collection("mapbonuses")).find;
                        return [4 /*yield*/, this.getIntervalFilter(filter, dbName, datetime, "mapbonuses")];
                    case 1: return [4 /*yield*/, _b.apply(_a, [_c.sent()])];
                    case 2:
                        result = _c.sent();
                        return [2 /*return*/, result.toArray()];
                }
            });
        });
    };
    MongoDBHandler.prototype.retrieveTotalFlips = function (dbName, filter, datetime) {
        return __awaiter(this, void 0, void 0, function () {
            var result, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = (_a = this.mongoDBConnection.db(dbName).collection("totalflips")).find;
                        return [4 /*yield*/, this.getIntervalFilter(filter, dbName, datetime, "totalflips")];
                    case 1:
                        result = _b.apply(_a, [_c.sent()]);
                        return [2 /*return*/, result.toArray()];
                }
            });
        });
    };
    MongoDBHandler.prototype.retrievePeakTime = function (dbName, filter, datetime) {
        return __awaiter(this, void 0, void 0, function () {
            var result, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = (_a = this.mongoDBConnection.db(dbName).collection("peaktime")).find;
                        return [4 /*yield*/, this.getIntervalFilter(filter, dbName, datetime, "peaktime")];
                    case 1: return [4 /*yield*/, _b.apply(_a, [_c.sent()])];
                    case 2:
                        result = _c.sent();
                        return [2 /*return*/, result.toArray()];
                }
            });
        });
    };
    MongoDBHandler.prototype.close = function () {
        this.mongoDBConnection.close();
    };
    MongoDBHandler.prototype.getIntervalFilter = function (filter, dbName, datetime, collectionName) {
        return __awaiter(this, void 0, void 0, function () {
            var intervalTimestamps;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getIntervalTimestampsByFilter(filter, dbName, datetime, collectionName)];
                    case 1:
                        intervalTimestamps = _a.sent();
                        return [2 /*return*/, {
                                timestamp: {
                                    $gte: intervalTimestamps[0],
                                    $lte: intervalTimestamps[1]
                                }
                            }];
                }
            });
        });
    };
    MongoDBHandler.prototype.getIntervalTimestampsByFilter = function (filter, dbName, datetime, collectionName) {
        return __awaiter(this, void 0, void 0, function () {
            var intervalTimestamps, endTimestamp, startTimestamp, _a, documentCursor, document_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        intervalTimestamps = [];
                        endTimestamp = DateTime.now();
                        if (datetime !== undefined && datetime.length > 0 && DateTime.fromISO(datetime) !== undefined) {
                            endTimestamp = DateTime.fromISO(datetime);
                        }
                        startTimestamp = endTimestamp;
                        _a = filter;
                        switch (_a) {
                            case 'Hour': return [3 /*break*/, 1];
                            case 'Day': return [3 /*break*/, 2];
                            case 'Week': return [3 /*break*/, 3];
                            case 'Match': return [3 /*break*/, 4];
                        }
                        return [3 /*break*/, 7];
                    case 1:
                        intervalTimestamps.push(startTimestamp.minus({ hours: 1 }).toString());
                        return [3 /*break*/, 7];
                    case 2:
                        intervalTimestamps.push(startTimestamp.minus({ days: 1 }).toString());
                        return [3 /*break*/, 7];
                    case 3:
                        intervalTimestamps.push(startTimestamp.minus({ days: 7 }).toString());
                        return [3 /*break*/, 7];
                    case 4: return [4 /*yield*/, this.mongoDBConnection.db(dbName).collection(collectionName).find().sort({ _id: -1 }).limit(1)];
                    case 5:
                        documentCursor = _b.sent();
                        return [4 /*yield*/, documentCursor.next()];
                    case 6:
                        document_1 = _b.sent();
                        intervalTimestamps.push(document_1.starttime);
                        endTimestamp = document_1.endtime;
                        return [3 /*break*/, 7];
                    case 7:
                        intervalTimestamps.push(endTimestamp.toString());
                        return [2 /*return*/, intervalTimestamps];
                }
            });
        });
    };
    return MongoDBHandler;
}());
module.exports = new MongoDBHandler();
