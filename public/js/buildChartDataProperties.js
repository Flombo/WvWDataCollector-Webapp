let red = 'rgba(255, 0, 0, 0.6)';
let blue = 'rgba(0, 0, 255, 0.6)';
let green = 'rgba(0, 255, 0, 0.6)';
let violet = '#000';
let colors = [red, blue, green, violet];

export default function buildChartDataProperties(data, labels, type) {

    let dataObject;

    switch(type) {

        case 'doughnut':
            dataObject = buildDoughnutDataObject(data, labels);
            break;

        case 'line':
            dataObject = buildLineChartDataObject(data, labels);
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

    const datasets = [];

    for(let i = 0; i < data.length - 1; i++) {
        let dataObject = {
            label: labels[i],
            fill: false,
            data: data[i],
            backgroundColor: colors[i],
            borderWidth: 1,
            borderColor: colors[i],
            hoverBorderWidth: 3,
        };

        datasets.push(dataObject);
    }

    return {
        labels: data[data.length - 1],
        datasets: datasets
    }
}