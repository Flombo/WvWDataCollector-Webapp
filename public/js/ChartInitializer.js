import optionsHelper from "./postOptionsHelper.js";

let victoryPointsChart;
let populationChart;
let filterOption = 'hour';
let databaseNameOption = '2-1';

window.onload = async () => {

    const selects = document.getElementsByTagName("select");
    const intervalSelect = selects[0];
    intervalSelect.addEventListener('change', () => {
        filterOption = intervalSelect.selectedOptions[0].value
        updateCharts();
    });

    const matchSelect = selects[1];
    matchSelect.addEventListener('change', () => {
        databaseNameOption = matchSelect.selectedOptions[0].value;
        updateCharts();
    });

    const victoryMetricsJSON = await pullVictoryMetrics();
    const victoryMetrics = retrieveVictoryMetrics(victoryMetricsJSON);

    let victoryPointsAndTimestamp = victoryMetrics.slice(0, 3);
    victoryPointsAndTimestamp.push(victoryMetrics[victoryMetrics.length - 1]);

    const populationAndTimestamp = victoryMetrics.slice(3, victoryMetrics.length);

    victoryPointsChart = initPopLineChart(victoryPointsAndTimestamp, 'Victory-points per Match', 'victoryMetricsLineChart', 'victoryPoints');
    populationChart = initPopLineChart(populationAndTimestamp, 'Population per Match', 'populationLineChart', 'population');

    setInterval(() => {
        updateCharts().then();
    }, 30000);
}

async function updateCharts() {
    const victoryMetricsJSON = await pullVictoryMetrics();
    const victoryMetrics = retrieveVictoryMetrics(victoryMetricsJSON);

    let victoryPointsAndTimestamp = victoryMetrics.slice(0, 3);
    victoryPointsAndTimestamp.push(victoryMetrics[victoryMetrics.length - 1]);

    const populationAndTimestamp = victoryMetrics.slice(3, victoryMetrics.length);

    victoryPointsChart.data = buildData(victoryPointsAndTimestamp, 'victoryPoints');
    victoryPointsChart.update();

    populationChart.data = buildData(populationAndTimestamp, 'population');
    //none prevents the chart from playing animations when updating
    populationChart.update();
}

async function pullVictoryMetrics() {

    let data = {
        databaseName : databaseNameOption,
        filter : filterOption
    };

    let options = optionsHelper(data);

    return await fetch('/victorymetrics', options).then(async (result) => {
        return await result.json();
    })
}

function retrieveVictoryMetrics(victoryMetricsJSON) {
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

    victoryMetricsJSON.victorymetrics.forEach(victoryMetric => {
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

function initPopLineChart(victoryMetrics, titleText, canvasID, dataType) {
    let victoryMetricsLineChart = document.getElementById(canvasID).getContext('2d');

    return new Chart(victoryMetricsLineChart, {
        type: 'line', // bar, horizontalBar, pie, line, doughnut, radar, polarArea
        data: buildData(victoryMetrics, dataType),
        options: {
            bezierCurve: true,
            title: {
                display: true,
                text: titleText,
                fontSize: 25
            },
            legend: {
                display: true,
                position: 'right',
                labels: {
                    fontColor: '#000'
                }
            },
            layout: {
                padding: {
                    left: 50,
                    right: 0,
                    bottom: 0,
                    top: 0
                }
            }
        }
    });

}

function buildData(victoryMetrics, dataType) {

    //variables:
    let red = 'rgba(255, 0, 0, 0.6)';
    let blue = 'rgba(0, 0, 255, 0.6)';
    let green = 'rgba(0, 255, 0, 0.6)';
    let data;

    if(dataType === 'victoryPoints') {
        data = {
            labels: victoryMetrics[victoryMetrics.length - 1],
            datasets: [
                {
                    label: 'Red Team',
                    // lineTension: 0,
                    fill: false,
                    data: victoryMetrics[0],
                    backgroundColor: red,
                    borderWidth: 1,
                    borderColor: red,
                    hoverBorderWidth: 3,
                },
                {
                    label: 'Blue Team',
                    // lineTension: 0,
                    fill: false,
                    data: victoryMetrics[1],
                    backgroundColor: blue,
                    borderWidth: 1,
                    borderColor: blue,
                    hoverBorderWidth: 3,
                },
                {
                    label: 'Green Team',
                    // lineTension: 0,
                    fill: false,
                    data: victoryMetrics[2],
                    backgroundColor: green,
                    borderWidth: 1,
                    borderColor: green,
                    hoverBorderWidth: 3,
                }
            ]
        };
    } else {
        data = {
            labels: victoryMetrics[victoryMetrics.length - 1],
            datasets: [
                {
                    label: 'Red-team-world: ' + victoryMetrics[3],
                    lineTension: 0,
                    fill: false,
                    data: victoryMetrics[0],
                    backgroundColor: red,
                    borderWidth: 7,
                    borderColor: red,
                    hoverBorderWidth: 3,
                },
                {
                    label: 'Blue-team-world: ' + victoryMetrics[4],
                    lineTension: 0,
                    fill: false,
                    data: victoryMetrics[1],
                    backgroundColor: blue,
                    borderWidth: 7,
                    borderColor: blue,
                    hoverBorderWidth: 3,
                },
                {
                    label: 'Green-team-world: ' + victoryMetrics[5],
                    lineTension: 0,
                    fill: false,
                    data: victoryMetrics[2],
                    backgroundColor: green,
                    borderWidth: 7,
                    borderColor: green,
                    hoverBorderWidth: 3,
                }
            ]
        }
    }

    return data;
}