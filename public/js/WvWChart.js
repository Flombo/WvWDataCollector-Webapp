import sendPostRequest from "./sendPostRequest.js";
import extractChartData from "./extractChartData.js";
import buildChart from "./buildChart.js";
import buildChartDataProperties from "./buildChartDataProperties.js";

export default class WvWChart {

    constructor(type, title, url, databaseNameOption, filterOption, datetimeOption, canvas) {
        this._type = type;
        this._title = title;
        this._url = url;
        this._canvas = canvas;
        this._chart = null;
        this.initChart(databaseNameOption, filterOption, datetimeOption).then();
    }

    async initChart(databaseNameOption, filterOption, datetimeOption) {
        const dataObject = await this.retrieveData(databaseNameOption, filterOption, datetimeOption);

        this._chart = buildChart(
            this._canvas,
            this._canvas.title,
            this._title,
            dataObject.data,
            dataObject.labels
        );
    }

    async retrieveData(databaseNameOption, filterOption, datetimeOption) {
        const json = await sendPostRequest(databaseNameOption, filterOption, datetimeOption, this._url);
        return extractChartData(json, this._canvas.id);
    }

    async updateChart(databaseNameOption, filterOption, datetimeOption, titleText) {
        const data = await this.retrieveData(databaseNameOption, filterOption, datetimeOption);
        this._chart.data = buildChartDataProperties(data.data, data.labels, this._type);
        console.log(titleText)
        this._chart.options.plugins.title.text = titleText + filterOption;
        this._chart.update();
    }

}