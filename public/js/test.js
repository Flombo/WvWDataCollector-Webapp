import optionsHelper from "./postOptionsHelper.js";

window.onload = () => {
    pullVictoryMetrics();
}

async function pullVictoryMetrics() {

    let testDataContainer = document.getElementById('testdata');

    let data = {
        databaseName : '2-1',
        filter : 'day'
    };

    let options = optionsHelper(data);

    await fetch('/victorymetrics', options).then(async (result) => {
        let victoryMetrics = await result.json();

        victoryMetrics.victorymetrics.forEach(victoryMetric => {
            let p = `<p>${victoryMetric.timestamp}</p>`;
            testDataContainer.innerHTML += p;
        });
    })
}