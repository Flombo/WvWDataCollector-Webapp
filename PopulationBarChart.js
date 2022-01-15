function initPopBarChart() {
    let populationBarChart = document.getElementById('populationBarChart').getContext('2d');

// Global Options
    Chart.defaults.global.defaultFontFamily = 'Lato';
    Chart.defaults.global.defaultFontSize = 18;
    Chart.defaults.global.defaultFontColor = '#777';

//variables:
    let red = 'rgba(255, 0, 0, 0.6)';
    let blue = 'rgba(0, 0, 255, 0.6)';
    let green = 'rgba(0, 255, 0, 0.6)';

    const data = {
        labels: ['Match 2-1', 'Match 2-2', 'Match 2-3', 'Match 2-4', 'Match 2-5'],
        datasets: [{
            label: 'Red Team',
            data: [
                randomIntBetweenOneAndFive(),
                randomIntBetweenOneAndFive(),
                randomIntBetweenOneAndFive(),
                randomIntBetweenOneAndFive(),
                randomIntBetweenOneAndFive()
            ],
            backgroundColor: red,
            borderWidth: 1,
            borderColor: '#777',
            hoverBorderWidth: 3,
            hoverBorderColor: '#000'
        },
            {
                label: 'Blue Team',
                data: [
                    randomIntBetweenOneAndFive(),
                    randomIntBetweenOneAndFive(),
                    randomIntBetweenOneAndFive(),
                    randomIntBetweenOneAndFive(),
                    randomIntBetweenOneAndFive()
                ],
                backgroundColor: blue,
                borderWidth: 1,
                borderColor: '#777',
                hoverBorderWidth: 3,
                hoverBorderColor: '#000'
            },
            {
                label: 'Green Team',
                data: [
                    randomIntBetweenOneAndFive(),
                    randomIntBetweenOneAndFive(),
                    randomIntBetweenOneAndFive(),
                    randomIntBetweenOneAndFive(),
                    randomIntBetweenOneAndFive()
                ],
                backgroundColor: green,
                borderWidth: 1,
                borderColor: '#777',
                hoverBorderWidth: 3,
                hoverBorderColor: '#000'
            }
        ]
    }

    new Chart(populationBarChart, {
        type: 'horizontalBar', // bar, horizontalBar, pie, line, doughnut, radar, polarArea
        data: data,
        options: {
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
            tooltips: {
                callbacks: {
                    label: function (tooltipItem, data) {
                        console.log("Tooltip item: ");
                        console.log(tooltipItem);
                        console.log("Data: ");
                        console.log(data);

                        let matchId = tooltipItem.yLabel.slice(-3);
                        let teamColour = data.datasets[tooltipItem.datasetIndex].label.slice(0, -5);

                        //get correct world name from matchid + colour

                        return matchId + ' ' + teamColour;
                    }
                },
                enabled: true
            },
            scales: {
                xAxes: [{
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
        min = 1;
        max = 5;

        return Math.floor(Math.random() * (max - min + 1) + min)
    }
}