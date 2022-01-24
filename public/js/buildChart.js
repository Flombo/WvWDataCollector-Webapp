import buildChartDataProperties from "./buildChartDataProperties.js";
import buildChartOptions from "./buildChartOptions.js";

export default function buildChart(canvas, type, titleText, data, labels) {

    const chartData = buildChartDataProperties(data, labels, type);
    const options = buildChartOptions(titleText).options;

    const config = {
        type : type,
        data : chartData,
        options : options
    }

    return new Chart(canvas, config);

}