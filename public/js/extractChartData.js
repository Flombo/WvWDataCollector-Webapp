export default function extractChartData(jsonData, viewType) {

    let chartData;

    switch (viewType) {
        case 'victorymetrics':
            chartData = buildVictoryMetricsData(jsonData);
            break;
        case 'totalflips':
            chartData = buildTotalFlipsData(jsonData);
            break;
        case 'peaktime':
            chartData = buildPeaktimeData(jsonData);
            break;
        case 'mapbonuses':
            chartData = buildMapBonusesData(jsonData);
            break;
    }

    return chartData;
}

function buildMapBonusesData(jsonData) {
    const redBuffHolds = [];
    const blueBuffHolds = [];
    const greenBuffHolds = [];
    const timestamps = [];

    jsonData.bonuses.forEach(mapBonuses => {
        let ownerShipArray = [0, 0, 0];

        const greenMapBuffOwner = retrieveBuffOwner(mapBonuses.greenmap);
        const centerMapBuffOwner = retrieveBuffOwner(mapBonuses.centermap);
        const blueMapBuffOwner = retrieveBuffOwner(mapBonuses.bluemap);
        const redMapBuffOwner = retrieveBuffOwner(mapBonuses.redmap);

        ownerShipArray = retrieveBuffOwnershipArrays(greenMapBuffOwner, ownerShipArray);
        ownerShipArray = retrieveBuffOwnershipArrays(centerMapBuffOwner, ownerShipArray);
        ownerShipArray = retrieveBuffOwnershipArrays(blueMapBuffOwner, ownerShipArray);
        ownerShipArray = retrieveBuffOwnershipArrays(redMapBuffOwner, ownerShipArray);

        redBuffHolds.push(ownerShipArray[1]);
        greenBuffHolds.push(ownerShipArray[0]);
        blueBuffHolds.push(ownerShipArray[2]);

        timestamps.push(mapBonuses.timestamp);

    });

    return [
        redBuffHolds,
        blueBuffHolds,
        greenBuffHolds,
        timestamps
    ]
}

function retrieveBuffOwnershipArrays(owner, ownerShipArray) {
    switch (owner) {
        case 'Green':
            ownerShipArray[0] = ownerShipArray[0]++;
            break;
        case 'Red':
            ownerShipArray[1] = ownerShipArray[0]++;
            break;
        case 'Blue':
            ownerShipArray[2] = ownerShipArray[2]++;
            break;
    }

    return ownerShipArray;
}

function retrieveBuffOwner(map) {
    let buffOwner = null;

    if(map.bonuses.length > 0) {
        buffOwner = map.bonuses[0].owner;
    }

    return buffOwner;
}

function buildPeaktimeData(jsonData) {
    let redPopulation = [];
    let bluePopulation = [];
    let greenPopulation = [];
    let redWorld;
    let blueWorld;
    let greenWorld;
    let timestamps = [];

    jsonData.peaktime.forEach(peakTime => {
       let red = peakTime.red;
       let blue = peakTime.blue;
       let green = peakTime.green;

       redPopulation.push(red.population);
       bluePopulation.push(blue.population);
       greenPopulation.push(green.population);

       redWorld = red.name;
       blueWorld = blue.name;
       greenWorld = green.name;

       timestamps.push(peakTime.timestamp);
    });

    return [
        redPopulation,
        bluePopulation,
        greenPopulation,
        [redWorld, blueWorld, greenWorld],
        timestamps
    ]
}

function buildTotalFlipsData(jsonData) {
    let totalflipsEternalBattlegrounds = [];
    let totalflipsDesertBorderlands = [];
    let totalflipsAlpineBordlerlands1 = [];
    let totalflipsAlpineBordlerlands2 = [];
    let timestamps = [];

    jsonData.totalflips.forEach(totalflip => {
       let totalflips = totalflip.totalflips;

       totalflipsEternalBattlegrounds.push(totalflips[0].flips);
       totalflipsDesertBorderlands.push(totalflips[1].flips);
       totalflipsAlpineBordlerlands1.push(totalflips[2].flips);
       totalflipsAlpineBordlerlands2.push(totalflips[3].flips);
       timestamps.push(totalflip.timestamp);
    });

    return [
        totalflipsEternalBattlegrounds,
        totalflipsDesertBorderlands,
        totalflipsAlpineBordlerlands1,
        totalflipsAlpineBordlerlands2,
        timestamps
    ]
}

function buildVictoryMetricsData(jsonData) {
    let victoryPointsRed = [];
    let victoryPointsBlue = [];
    let victoryPointsGreen = [];
    let populationRed = [];
    let populationBlue = [];
    let populationGreen = [];
    let timestamps = [];
    let redWorld;
    let blueWorld;
    let greenWorld;

    jsonData.victorymetrics.forEach(victoryMetric => {
        let victoryMetrics = victoryMetric.victorymetrics;

        victoryPointsRed.push(victoryMetrics.red.victorypoints);
        victoryPointsBlue.push(victoryMetrics.blue.victorypoints);
        victoryPointsGreen.push(victoryMetrics.green.victorypoints);

        populationRed.push(victoryMetrics.red.population.population);
        redWorld = victoryMetrics.red.population.name;
        populationBlue.push(victoryMetrics.blue.population.population);
        blueWorld = victoryMetrics.blue.population.name;
        populationGreen.push(victoryMetrics.green.population.population);
        greenWorld = victoryMetrics.green.population.name;

        timestamps.push(victoryMetric.timestamp);
    });

    return [
        victoryPointsRed,
        victoryPointsBlue,
        victoryPointsGreen,
        populationRed,
        populationBlue,
        populationGreen,
        redWorld,
        blueWorld,
        greenWorld,
        timestamps
    ];
}