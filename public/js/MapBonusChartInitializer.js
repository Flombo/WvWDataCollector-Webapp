import buildChart from "./buildChart.js";
import sendPostRequest from "./sendPostRequest.js";
import buildChartDataProperties from "./buildChartDataProperties.js";
import extractChartData from "./extractChartData.js";

let victoryPointsChart;
let mapBonusesChart;
let filterOption = 'hour';
let databaseNameOption = '2-1';
let starttimestampOption = '';
let labelsVictoryPoints;
let labelsMapBonuses;

window.onload = async () => {
    const datetimepicker = document.getElementById('datetimepicker');

    const datepicker = new Datepicker(datetimepicker, {
        time: true
    });

    const victoryMetricsJSON = await sendPostRequest(databaseNameOption, filterOption, '/victorymetrics');
    const victoryMetrics = extractChartData(victoryMetricsJSON, 'victorymetrics');

    let victoryPointsAndTimestamp = victoryMetrics.slice(0, 3);
    victoryPointsAndTimestamp.push(victoryMetrics[victoryMetrics.length - 1]);

    const mapBonusesJSON = await sendPostRequest(databaseNameOption, filterOption, '/bonuses');
    const mapBonuses = extractChartData(mapBonusesJSON, 'mapbonuses');

    const victoryMetricsLineCanvas = document.getElementById('victoryMetricsLineChart');
    const mapBonusesLineCanvas = document.getElementById('mapBonusesLineChart');

    labelsVictoryPoints = ['Red Victory Points', 'Blue Victory Points', 'Green Victory Points'];
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

    mapBonusesChart = buildChart(
        mapBonusesLineCanvas,
        mapBonusesLineCanvas.title,
        'Map-bonuses per ' + filterOption,
        mapBonuses,
        labelsMapBonuses
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

    const mapBonusesJSON = await sendPostRequest(databaseNameOption, filterOption, '/bonuses');
    const mapBonuses = extractChartData(mapBonusesJSON, 'mapbonuses');

    victoryPointsChart.data = buildChartDataProperties(victoryPointsAndTimestamp, labelsVictoryPoints, 'line');
    victoryPointsChart.update();

    mapBonusesChart.data = buildChartDataProperties(mapBonuses, labelsMapBonuses, 'line');
    //none prevents the chart from playing animations when updating
    mapBonusesChart.update();
}