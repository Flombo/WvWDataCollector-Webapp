export default function extractChartData(jsonData, viewType) {

    let chartData;

    switch (viewType) {

        case 'victoryMetricsLineChart':
            chartData = buildVictoryMetricsData(jsonData);
            break;
        case 'totalFlipsLineChart':
            chartData = buildTotalFlipsData(jsonData);
            break;
        case 'totalFlipsDoughnutChart':
            chartData = buildTotalFlipsData(jsonData);
            break;
        case 'peakTimeLineChart':
            chartData = buildPeaktimeData(jsonData);
            break;
        case 'peakTimeDoughnutChart':
            chartData = buildPeaktimeData(jsonData);
            break;
        case 'mapBonusesLineChart':
            chartData = buildMapBonusesData(jsonData);
            break;
    }

    return chartData;
}

function buildMapBonusesData(jsonData) {
    let bonuses = jsonData.bonuses;
    let labels = bonuses[3];
    let data = [
        bonuses[0],
        bonuses[1],
        bonuses[2],
        bonuses[4]
    ];

    return {data : data, labels : labels}
}

function buildPeaktimeData(jsonData) {
    let peakTimes = jsonData.peaktime;
    let data = peakTimes.slice(0, 3);
    data.push(peakTimes[peakTimes.length - 1]);
    const worldArray = peakTimes[3];
    let peakTimesLabels = [`Red-World : ${worldArray[0]}`, `Blue-World : ${worldArray[1]}`, `Green-World : ${worldArray[2]}`];

    return {data : data, labels : peakTimesLabels}
}

function buildTotalFlipsData(jsonData) {
    let totalflips = jsonData.totalflips;
    let totalFlipsAndTimestamps = totalflips.slice(0, 4);
    totalFlipsAndTimestamps.push(totalflips[totalflips.length - 1]);
    let totalFlipLabels = totalflips[4];

    return {data : totalFlipsAndTimestamps, labels :totalFlipLabels};
}

function buildVictoryMetricsData(jsonData) {
    let victorymetrics = jsonData.victorymetrics;
    let victoryPointsAndTimestamp = victorymetrics.slice(0, 3);
    victoryPointsAndTimestamp.push(victorymetrics[victorymetrics.length - 1]);

    return {data : victoryPointsAndTimestamp, labels : ['Red Victory Points', 'Blue Victory Points', 'Green Victory Points']};
}