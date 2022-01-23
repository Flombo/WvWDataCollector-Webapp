export default function buildChartOptions(titleText) {
    return {
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
    }
}