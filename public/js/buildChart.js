import buildChartDataProperties from "./buildChartDataProperties.js";
import buildChartOptions from "./buildChartOptions.js";

export default function buildChart(canvas, type, titleText, data, labels) {

    const chartData = buildChartDataProperties(data, labels, type);
    const options = buildChartOptions(titleText);

    const config = {
        type,
        chartData,
        options
    }

    return new Chart(canvas, config);

}