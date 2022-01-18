function initPopLineChart() {
    let populationLineChart = document.getElementById('populationLineChart').getContext('2d');

// Global Options
    Chart.defaults.global.defaultFontFamily = 'Lato';
    Chart.defaults.global.defaultFontSize = 18;
    Chart.defaults.global.defaultFontColor = '#777';

//variables:
    let red = 'rgba(255, 0, 0, 0.6)';
    let blue = 'rgba(0, 0, 255, 0.6)';
    let green = 'rgba(0, 255, 0, 0.6)';

    const labels = ['10:00 Uhr', '11:00 Uhr', '12:00 Uhr', '13:00 Uhr', '14:00 Uhr'];


    const data = {
        labels: labels,
        datasets: [{
            label: 'Red Team',
            lineTension: 0,
            fill: false,
            data: [
                randomIntBetweenOneAndFive(),
                randomIntBetweenOneAndFive(),
                randomIntBetweenOneAndFive(),
                randomIntBetweenOneAndFive(),
                randomIntBetweenOneAndFive()
            ],
            backgroundColor: red,
            borderWidth: 7,
            borderColor: red,
            hoverBorderWidth: 3,
        },
            {
                label: 'Blue Team',
                lineTension: 0,
                fill: false,
                data: [
                    randomIntBetweenOneAndFive(),
                    randomIntBetweenOneAndFive(),
                    randomIntBetweenOneAndFive(),
                    randomIntBetweenOneAndFive(),
                    randomIntBetweenOneAndFive()
                ],
                backgroundColor: blue,
                borderWidth: 7,
                borderColor: blue,
                hoverBorderWidth: 3,
            },
            {
                label: 'Green Team',
                lineTension: 0,
                fill: false,
                data: [
                    randomIntBetweenOneAndFive(),
                    randomIntBetweenOneAndFive(),
                    randomIntBetweenOneAndFive(),
                    randomIntBetweenOneAndFive(),
                    randomIntBetweenOneAndFive()
                ],
                backgroundColor: green,
                borderWidth: 7,
                borderColor: green,
                hoverBorderWidth: 3,
            }
        ]
    }

    new Chart(populationLineChart, {
        type: 'line', // bar, horizontalBar, pie, line, doughnut, radar, polarArea
        data: data,
        options: {
            bezierCurve: false,
            title: {
                display: true,
                text: 'World Populations per Match',
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
            },

            scales: {
                yAxes: [{
                    display: true,
                    ticks: {
                        suggestedMin: 0,
                        suggestedMax: 5,
                        stepSize: 1
                    }
                }]
            }
        }
    });


// function for random datapoints
    function randomIntBetweenOneAndFive() {
        let min = 1;
        let max = 5;

        return Math.floor(Math.random() * (max - min + 1) + min)
    }
}