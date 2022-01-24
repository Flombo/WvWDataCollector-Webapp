import buildChart from "./buildChart.js";
import sendPostRequest from "./sendPostRequest.js";
import buildChartDataProperties from "./buildChartDataProperties.js";
import extractChartData from "./extractChartData.js";

let victoryPointsChart;
let populationChart;
let filterOption = 'hour';
let databaseNameOption = '2-1';
let starttimestampOption = '';
let labelsVictoryPoints;
let labelsPopulation;

window.onload = () => initChart().then();

async function initChart() {
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

    labelsVictoryPoints = ['Red Victory Points', 'Blue Victory Points', 'Green Victory Points'];
    labelsPopulation = [
        `Red world : ${populationAndTimestamp[3]}`,
        `Blue world : ${populationAndTimestamp[4]}`,
        `Green world : ${populationAndTimestamp[5]}`
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
}