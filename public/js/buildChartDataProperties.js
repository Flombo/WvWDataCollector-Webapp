let red = 'rgba(255, 0, 0, 0.6)';
let blue = 'rgba(0, 0, 255, 0.6)';
let green = 'rgba(0, 255, 0, 0.6)';
let violet = '#000';

export default function buildChartDataProperties(data, labels, type) {

    let dataObject;

    switch(type) {

        case 'doughnut':
            dataObject = buildDoughnutDataObject(data, labels);
            break;

        case 'line':
            dataObject = buildLineChartDataObject(data, labels);
            break;
        case 'bar':
            dataObject = buildBarDataObject(data, labels);
            break;
    }

    return dataObject;
}

function buildDoughnutDataObject(data, labels) {
    const doughnutData = [];

    for(let i = 0; i < data.length; i++) {
        let length = data[i].length;
        let sum = 0;
        let innerDataArray = data[i];

        for(let y = 0; y < length; y++) {
            sum += innerDataArray[y];
        }

        doughnutData.push(Math.round(sum / length));
    }

    return {
        labels: labels,
        datasets: [
            {
                fill: false,
                data: doughnutData,
                backgroundColor: [red, blue, green, violet],
                borderWidth: 1,
                borderColor: red,
                hoverBorderWidth: 3,
            }
        ]
    }
}

function buildLineChartDataObject(data, labels) {
    return {
        labels: data[data.length - 1],
        datasets: [
            {
                label: labels[0],
                fill: false,
                data: data[0],
                backgroundColor: red,
                borderWidth: 1,
                borderColor: red,
                hoverBorderWidth: 3,
            },
            {
                label: labels[1],
                fill: false,
                data: data[1],
                backgroundColor: blue,
                borderWidth: 1,
                borderColor: blue,
                hoverBorderWidth: 3,
            },
            {
                label: labels[2],
                fill: false,
                data: data[2],
                backgroundColor: green,
                borderWidth: 1,
                borderColor: green,
                hoverBorderWidth: 3,
            }
        ]
    }
}

function buildBarDataObject(data, labels) {
    return {
        labels: data[data.length - 1],
        datasets: [
            {
                label: labels[0],
                data: [
                    data[0]
                ],
                backgroundColor: red,
                borderWidth: 1,
                borderColor: '#777',
                hoverBorderWidth: 3,
                hoverBorderColor: '#000'
            },
            {
                label: labels[1],
                data: [
                    data[1]
                ],
                backgroundColor: blue,
                borderWidth: 1,
                borderColor: '#777',
                hoverBorderWidth: 3,
                hoverBorderColor: '#000'
            },
            {
                label: labels[2],
                data: [
                    data[2]
                ],
                backgroundColor: green,
                borderWidth: 1,
                borderColor: '#777',
                hoverBorderWidth: 3,
                hoverBorderColor: '#000'
            }
        ]
    }
}