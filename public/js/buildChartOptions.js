export default function buildChartOptions(titleText) {
    return {
        options: {
            plugins : {
                title: {
                    display: true,
                    text: titleText,
                    fontSize: 25,
                    position: 'top'
                },
                bezierCurve: true,
                legend: {
                    display: true,
                    position: 'bottom',
                    align: "middle",
                    labels: {
                        fontColor: '#000'
                    }
                },
                layout: {
                    padding: {
                        left: 0,
                        right: 0,
                        bottom: 0,
                        top: 0
                    }
                }
            }
        }
    }

}