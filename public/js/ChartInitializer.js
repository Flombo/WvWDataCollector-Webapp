import WvWChart from "./WvWChart.js";

let charts = [];
let filterOption = 'Hour';
let databaseNameOption = '2-1';
let datetimeOption = '2022-01-29T11:30';
let shouldUpdateCharts = false;
const peaktimeTitle = 'Peak-time per :';
const totalFlipsTitle = 'Captures per map per :';
const mapbonusesTitle = 'Map-bonuses per :';
const victoryMetricsTitle = 'Victory-points per :';
let enableUpdateCheckbox;

window.onload = () => {

    shouldUpdateCharts = localStorage.getItem('shouldUpdateCharts') !== 'false';
    enableUpdateCheckbox = document.getElementById('enableUpdateCheckbox');
    enableUpdateCheckbox.checked = Boolean(shouldUpdateCharts);

    initUpdateCheckbox();
    initDatetimepicker();
    initChartsByCanvases();
    initSelectFields();

    setInterval(() => {
        if(shouldUpdateCharts) {
            updateCharts().then();
        }
    }, 60000);
}

function initDatetimepicker() {
    const datetimepicker = document.getElementById('datetimepicker');
    datetimepicker.value = '2022-01-29T11:30';

    datetimepicker.addEventListener('input', async () => {
       datetimeOption = datetimepicker.value;
       await updateCharts();
    });
}

function initUpdateCheckbox() {
    enableUpdateCheckbox.addEventListener('change', () => {
        shouldUpdateCharts = !shouldUpdateCharts;
        localStorage.setItem('shouldUpdateCharts', shouldUpdateCharts);
        enableUpdateCheckbox.checked = Boolean(shouldUpdateCharts);
    });
}

function initSelectFields() {
    const selects = document.getElementsByTagName("select");

    selects[0].addEventListener('change', async () => {
        filterOption = selects[0].selectedOptions[0].value
        await updateCharts();
    });

    selects[1].addEventListener('change', async () => {
        databaseNameOption = selects[1].selectedOptions[0].value
        await updateCharts();
    });
}

function initChartsByCanvases() {
    const canvases = document.getElementsByTagName('canvas');

    for(let i = 0; i < canvases.length; i++) {
        let canvas = canvases[i];

        switch (canvas.id) {
            case 'peakTimeLineChart':
                charts.push(new WvWChart(canvas.title, peaktimeTitle + filterOption, '/peaktime', databaseNameOption, filterOption, datetimeOption, canvas));
                break;
            case 'peakTimeDoughnutChart':
                charts.push(new WvWChart(canvas.title, peaktimeTitle + filterOption, '/peaktime', databaseNameOption, filterOption, datetimeOption, canvas));
                break;
            case 'mapBonusesLineChart':
                charts.push(new WvWChart(canvas.title, mapbonusesTitle + filterOption, '/bonuses', databaseNameOption, filterOption, datetimeOption, canvas));
                break;
            case 'victoryMetricsLineChart':
                charts.push(new WvWChart(canvas.title, victoryMetricsTitle + filterOption, '/victorymetrics', databaseNameOption, filterOption, datetimeOption, canvas));
                break;
            case 'totalFlipsLineChart':
                charts.push(new WvWChart(canvas.title, totalFlipsTitle + filterOption, '/totalflips', databaseNameOption, filterOption, datetimeOption, canvas));
                break;
        }
    }
}

async function updateCharts() {
    for (const chart of charts) {
        await chart.updateChart(databaseNameOption, filterOption, datetimeOption, chart._title.split(':')[0] +  ':');
    }
}