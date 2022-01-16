function initBloodlustBonusDoughnutChart() {
    let BloodlustBonusDoughnutChart = document.getElementById('bloodlustBonusDoughnutChart').getContext('2d');

// Global Options
    Chart.defaults.global.defaultFontFamily = 'Lato';
    Chart.defaults.global.defaultFontSize = 18;
    Chart.defaults.global.defaultFontColor = '#777';

//variables:
    let red = 'rgba(255, 0, 0, 0.6)';
    let blue = 'rgba(0, 0, 255, 0.6)';
    let green = 'rgba(0, 255, 0, 0.6)';
    let black = 'rgba(0, 0, 0, 0.6)';

    const labels = ['Red Team', 'Blue Team', 'Green Team', 'Not held'];

    let dataPoints = [
        randomIntBetweenOneAndFive(),
        randomIntBetweenOneAndFive(),
        randomIntBetweenOneAndFive(),
        randomIntBetweenOneAndFive()
    ];


    const data = {
        labels: labels,
        datasets: [{
            data: dataPoints,
            backgroundColor: [red,blue,green],
            borderWidth: 7,
            borderColor: black,
            hoverBorderWidth: 3,
        }
        ]
    }

    new Chart(BloodlustBonusDoughnutChart, {
        type: 'doughnut', // bar, horizontalBar, pie, line, doughnut, radar, polarArea
        data: data,
        options: {
            title: {
                display: true,
                text: 'Ratio of held Bloodlust Bonuses',
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
                        let index = tooltipItem.index;
                        let value = data.datasets[0].data[index];
                        let sum = data.datasets[0].data.reduce((pv, cv) => pv + cv, 0);

                        return value*100/sum + "% of the time";
                    }
                },
                enabled: true
            },
        }
    });

// function for random datapoints
    function randomIntBetweenOneAndFive() {
        min = 1;
        max = 5;

        return Math.floor(Math.random() * (max - min + 1) + min)
    }
}