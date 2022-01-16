import optionsHelper from "./postOptionsHelper.js";

window.onload = () => {
    pullVictoryMetrics();
}

async function pullVictoryMetrics() {

    let testDataContainter = document.getElementById('testdata');

    let data = {
        databaseName : '2-1'
    };

    console.log(data);

    let options = optionsHelper(data);

    await fetch('/victorymetrics', options).then(async (result) => {
        let victoryMetrics = await result.json();
        console.log(victoryMetrics);
        testDataContainter.innerText = victoryMetrics.victorymetrics;
    })
}