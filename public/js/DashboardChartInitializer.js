import buildChart from "./buildChart.js";
import sendPostRequest from "./sendPostRequest.js";
import buildChartDataProperties from "./buildChartDataProperties.js";
import extractChartData from "./extractChartData.js";

let victoryPointsChart;
let populationChart;
let mapBonusesChart;
let peakTimeChart;
let totalFlipsChart;
let totalFLipsDoughnutChart;
let filterOption = 'hour';
let databaseNameOption = '2-1';
let starttimestampOption = '';
let labelsVictoryPoints;
let labelsPopulation;
let labelsMapBonuses;
let peakTimesLabels;
let labelsTotalFlips;
let labelsTotalFlipsDoughnut;

window.onload = async () => {
    const datetimepicker = document.getElementById('datetimepicker');

    const datepicker = new Datepicker(datetimepicker, {
        time: true
    });

    const victoryMetricsJSON = await sendPostRequest(databaseNameOption, filterOption, '/victorymetrics');
    const victoryMetrics = extractChartData(victoryMetricsJSON, 'victorymetrics');

    let victoryPointsAndTimestamp = victoryMetrics.slice(0, 3);
    victoryPointsAndTimestamp.push(victoryMetrics[victoryMetrics.length - 1]);

    let populationAndTimestamp = victoryMetrics.slice(3, victoryMetrics.length);

    const populationRedArray = populationAndTimestamp[0];
    const latestRedPopulation = populationRedArray[populationRedArray.length - 1];

    const populationBlueArray = populationAndTimestamp[1];
    const latestBluePopulation = populationBlueArray[populationBlueArray.length - 1];

    const populationGreenArray = populationAndTimestamp[2];
    const latestGreenPopulation = populationGreenArray[populationGreenArray.length - 1];

    populationAndTimestamp = [
        latestRedPopulation,
        latestBluePopulation,
        latestGreenPopulation
    ]

    const victoryMetricsLineCanvas = document.getElementById('victoryMetricsLineChart');
    const populationBarCanvas = document.getElementById('populationBarChart');
    const mapBonusesLineCanvas = document.getElementById('mapBonusesLineChart');

    labelsVictoryPoints = ['Red Victory Points', 'Blue Victory Points', 'Green Victory Points'];
    labelsPopulation = [
        `Red world : ${populationAndTimestamp[3]}`,
        `Blue world : ${populationAndTimestamp[4]}`,
        `Green world : ${populationAndTimestamp[5]}`
    ];

    const peakTimeJSON = await sendPostRequest(databaseNameOption, filterOption, '/peaktime');
    const peakTimes = extractChartData(peakTimeJSON, 'peaktime');

    const peaktimeCanvas = document.getElementById('peakTimeLineChart');

    const worldArray = peakTimes[3];

    peakTimesLabels = [`Red-World : ${worldArray[0]}`, `Blue-World : ${worldArray[1]}`, `Green-World : ${worldArray[2]}`];

    peakTimeChart = buildChart(
        peaktimeCanvas,
        peaktimeCanvas.title,
        'Peak-time per ' + filterOption,
        peakTimes,
        peakTimesLabels
    );

    const mapBonusesJSON = await sendPostRequest(databaseNameOption, filterOption, '/bonuses');
    const mapBonuses = extractChartData(mapBonusesJSON, 'mapbonuses');

    labelsMapBonuses = [
        'Red-Buff-Ownership',
        'Blue-Buff-Ownership',
        'Green-Buff-Ownership'
    ];

    victoryPointsChart = buildChart(
        victoryMetricsLineCanvas,
        victoryMetricsLineCanvas.title,
        'Victory-points per ' + filterOption,
        victoryPointsAndTimestamp,
        labelsVictoryPoints
    );

    populationChart = buildChart(
        populationBarCanvas,
        populationBarCanvas.title,
        'Population per ' + filterOption,
        populationAndTimestamp,
        labelsPopulation
    );

    mapBonusesChart = buildChart(
        mapBonusesLineCanvas,
        mapBonusesLineCanvas.title,
        'Map-bonuses per ' + filterOption,
        mapBonuses,
        labelsMapBonuses
    );

    const totalFlipsJSON = await sendPostRequest(databaseNameOption, filterOption, '/totalflips');
    const totalflips = extractChartData(totalFlipsJSON, 'totalflips');

    let totalFlipsAndTimestamps = totalflips.slice(0, 4);
    totalFlipsAndTimestamps.push(totalflips[totalflips.length - 1]);

    const totalFlipsCanvas = document.getElementById('totalFlipsLineChart');

    labelsTotalFlips = ['Eternal Battlegrounds', 'Desert Borderlands', 'Alpine Borderlands1', 'Alpine Borderlands2'];

    totalFlipsChart = buildChart(
        totalFlipsCanvas,
        totalFlipsCanvas.title,
        'Total captures per map during one ' + filterOption,
        totalFlipsAndTimestamps,
        labelsTotalFlips
    );

    const totalFlipsDoughnutCanvas = document.getElementById('totalFlipsDoughnutChart');

    labelsTotalFlipsDoughnut = ['Eternal Battlegrounds', 'Desert Borderlands', 'Alpine Borderlands1', 'Alpine Borderlands2']

    totalFLipsDoughnutChart = buildChart(
        totalFlipsDoughnutCanvas,
        totalFlipsDoughnutCanvas.title,
        'Total captures per map during one ' + filterOption,
        totalFlipsAndTimestamps,
        labelsTotalFlipsDoughnut
    );

    const selects = document.getElementsByTagName("select");
    selects[0].addEventListener('change', async () => {
        filterOption = selects[0].selectedOptions[0].value
        await updateCharts();
    });

    selects[1].addEventListener('change', async () => {
        databaseNameOption = selects[1].selectedOptions[0].value
        await updateCharts();
    });

    setInterval(() => {
        updateCharts().then();
    }, 30000);
}

async function updateCharts() {
    const victoryMetricsJSON = await sendPostRequest(databaseNameOption, filterOption, '/victorymetrics');
    const victoryMetrics = extractChartData(victoryMetricsJSON, 'victorymetrics');

    let victoryPointsAndTimestamp = victoryMetrics.slice(0, 3);
    victoryPointsAndTimestamp.push(victoryMetrics[victoryMetrics.length - 1]);

    let populationAndTimestamp = victoryMetrics.slice(3, victoryMetrics.length);

    labelsPopulation = [
        `Red world : ${populationAndTimestamp[3]}`,
        `Blue world : ${populationAndTimestamp[4]}`,
        `Green world : ${populationAndTimestamp[5]}`
    ];

    const populationRedArray = populationAndTimestamp[0];
    const latestRedPopulation = populationRedArray[populationRedArray.length - 1];

    const populationBlueArray = populationAndTimestamp[1];
    const latestBluePopulation = populationBlueArray[populationBlueArray.length - 1];

    const populationGreenArray = populationAndTimestamp[2];
    const latestGreenPopulation = populationGreenArray[populationGreenArray.length - 1];

    const timestampArray = populationAndTimestamp[populationAndTimestamp.length - 1];
    const latestTimestamp = timestampArray[timestampArray.length - 1];

    populationAndTimestamp = [
        latestRedPopulation,
        latestBluePopulation,
        latestGreenPopulation,
        [latestTimestamp]
    ];

    victoryPointsChart.data = buildChartDataProperties(victoryPointsAndTimestamp, labelsVictoryPoints, 'line');
    victoryPointsChart.update();

    populationChart.data = buildChartDataProperties(populationAndTimestamp, labelsPopulation, 'bar');
    //none prevents the chart from playing animations when updating
    populationChart.update();

    const mapBonusesJSON = await sendPostRequest(databaseNameOption, filterOption, '/bonuses');
    const mapBonuses = extractChartData(mapBonusesJSON, 'mapbonuses');

    mapBonusesChart.data = buildChartDataProperties(mapBonuses, labelsMapBonuses, 'line');
    //none prevents the chart from playing animations when updating
    mapBonusesChart.update();

    const peakTimesJSON = await sendPostRequest(databaseNameOption, filterOption, '/peaktime');
    const peakTimes = extractChartData(peakTimesJSON, 'peaktime');

    const worldArray = peakTimes[3];
    peakTimesLabels = [`Red-World : ${worldArray[0]}`, `Blue-World : ${worldArray[1]}`, `Green-World : ${worldArray[2]}`];

    peakTimeChart.data = buildChartDataProperties(peakTimes, peakTimesLabels, 'line');
    peakTimeChart.update();

    const totalFlipsJSON = await sendPostRequest(databaseNameOption, filterOption, '/totalflips');
    const totalFlips = extractChartData(totalFlipsJSON, 'totalflips');

    let totalFlipsAndTimestamps = totalFlips.slice(0, 4);
    totalFlipsAndTimestamps.push(totalFlips[totalFlips.length - 1]);

    totalFlipsChart.data = buildChartDataProperties(totalFlipsAndTimestamps, labelsTotalFlips, 'line');
    totalFlipsChart.update();

    totalFLipsDoughnutChart.data = buildChartDataProperties(totalFlipsAndTimestamps,labelsTotalFlipsDoughnut, 'doughnut');
    totalFLipsDoughnutChart.update();
}