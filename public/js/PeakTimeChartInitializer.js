import buildChart from "./buildChart.js";
import sendPostRequest from "./sendPostRequest.js";
import buildChartDataProperties from "./buildChartDataProperties.js";
import extractChartData from "./extractChartData.js";

let peakTimeChart;
let peakTimeBarChart;
let filterOption = 'hour';
let databaseNameOption = '2-1';
let starttimestampOption = '';
let peakTimesLabels;


window.onload = async () => {
    const datetimepicker = document.getElementById('datetimepicker');

    const datepicker = new Datepicker(datetimepicker, {
        time: true
    });

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

    const peaktimeBarCanvas = document.getElementById('peakTimeBarChart');

    peakTimeBarChart = buildChart(
        peaktimeBarCanvas,
        peaktimeBarCanvas.title,
        'Peak-time per ' + filterOption,
        peakTimes,
        peakTimesLabels
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
    const peakTimesJSON = await sendPostRequest(databaseNameOption, filterOption, '/peaktime');
    const peakTimes = extractChartData(peakTimesJSON, 'peaktime');

    const worldArray = peakTimes[3];
    peakTimesLabels = [`Red-World : ${worldArray[0]}`, `Blue-World : ${worldArray[1]}`, `Green-World : ${worldArray[2]}`];

    peakTimeChart.data = buildChartDataProperties(peakTimes, peakTimesLabels, 'line');
    peakTimeChart.update();

    peakTimeBarChart.data = buildChartDataProperties(peakTimes, peakTimesLabels, 'doughnut');
    peakTimeBarChart.update();
}