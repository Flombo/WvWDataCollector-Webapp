import buildChart from "./buildChart.js";
import sendPostRequest from "./sendPostRequest.js";
import buildChartDataProperties from "./buildChartDataProperties.js";
import extractChartData from "./extractChartData.js";

let totalFlipsChart;
let totalFLipsDoughnutChart;
let filterOption = 'Hour';
let databaseNameOption = '2-1';
let starttimestampOption = '';
let labelsTotalFlips;
let labelsTotalFlipsDoughnut;

window.onload = async () => {
    const datetimepicker = document.getElementById('datetimepicker');

    const datepicker = new Datepicker(datetimepicker, {
        time: true
    });

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
    const totalFlipsJSON = await sendPostRequest(databaseNameOption, filterOption, '/totalflips');
    const totalFlips = extractChartData(totalFlipsJSON, 'totalflips');

    let totalFlipsAndTimestamps = totalFlips.slice(0, 4);
    totalFlipsAndTimestamps.push(totalFlips[totalFlips.length - 1]);

    totalFlipsChart.data = buildChartDataProperties(totalFlipsAndTimestamps, labelsTotalFlips, 'line');
    totalFlipsChart.update();

    totalFLipsDoughnutChart.data = buildChartDataProperties(totalFlipsAndTimestamps,labelsTotalFlipsDoughnut, 'doughnut');
    totalFLipsDoughnutChart.update();
}