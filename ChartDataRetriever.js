class ChartDataRetriever {

    getTotalFlipsData(totalFLipsJSON) {
        const totalflipsEternalBattlegrounds = [];
        const totalflipsDesertBorderlands = [];
        const totalflipsAlpineBordlerlands1 = [];
        const totalflipsAlpineBordlerlands2 = [];
        const labels = [];
        const timestamps = [];

        totalFLipsJSON.forEach(totalflip => {
            let totalflips = totalflip.totalflips;

            for(let i = 0; i < totalflips.length; i++) {
                switch (totalflips[i].mapname) {
                    case 'EternalBattlegrounds':
                        totalflipsEternalBattlegrounds.push(totalflips[i].flips);
                        break;
                    case 'AlpineBorderlands2':
                        totalflipsAlpineBordlerlands2.push(totalflips[i].flips);
                        break;
                    case 'DesertBorderlands':
                        totalflipsDesertBorderlands.push(totalflips[i].flips);
                        break;
                    case 'AlpineBorderlands1':
                        totalflipsAlpineBordlerlands1.push(totalflips[i].flips);
                        break;
                }
            }
            timestamps.push(totalflip.timestamp);
        });

        labels.push("Eternal Battlegrounds", "Desert Borderlands", "Alpine Borderlands1", "Alpine Borderlands2");

        return [
            totalflipsEternalBattlegrounds,
            totalflipsDesertBorderlands,
            totalflipsAlpineBordlerlands1,
            totalflipsAlpineBordlerlands2,
            labels,
            timestamps
        ]
    }

    getPeaktimeData(peakTimeJSON) {
        let redPopulation = [];
        let bluePopulation = [];
        let greenPopulation = [];
        let redWorld;
        let blueWorld;
        let greenWorld;
        let timestamps = [];

        peakTimeJSON.forEach(peakTime => {
            let red = peakTime.red;
            let blue = peakTime.blue;
            let green = peakTime.green;

            redPopulation.push(red.population);
            bluePopulation.push(blue.population);
            greenPopulation.push(green.population);

            redWorld = red.name;
            blueWorld = blue.name;
            greenWorld = green.name;

            timestamps.push(peakTime.timestamp);
        });

        return [
            redPopulation,
            bluePopulation,
            greenPopulation,
            [redWorld, blueWorld, greenWorld],
            timestamps
        ]
    }

    getMapBonusesData(mapBonusesJSON) {
        const redBuffHolds = [];
        const blueBuffHolds = [];
        const greenBuffHolds = [];
        const timestamps = [];

        mapBonusesJSON.forEach(mapBonuses => {
            let ownerShipArray = [0, 0, 0];

            const greenMapBuffOwner = this.retrieveBuffOwner(mapBonuses.greenmap);
            const centerMapBuffOwner = this.retrieveBuffOwner(mapBonuses.centermap);
            const blueMapBuffOwner = this.retrieveBuffOwner(mapBonuses.bluemap);
            const redMapBuffOwner = this.retrieveBuffOwner(mapBonuses.redmap);

            ownerShipArray = this.retrieveBuffOwnershipArrays(greenMapBuffOwner, ownerShipArray);
            ownerShipArray = this.retrieveBuffOwnershipArrays(centerMapBuffOwner, ownerShipArray);
            ownerShipArray = this.retrieveBuffOwnershipArrays(blueMapBuffOwner, ownerShipArray);
            ownerShipArray = this.retrieveBuffOwnershipArrays(redMapBuffOwner, ownerShipArray);

            redBuffHolds.push(ownerShipArray[1]);
            greenBuffHolds.push(ownerShipArray[0]);
            blueBuffHolds.push(ownerShipArray[2]);

            timestamps.push(mapBonuses.timestamp);

        });

        return [
            redBuffHolds,
            blueBuffHolds,
            greenBuffHolds,
            ['Red-Buff-Ownership', 'Blue-Buff-Ownership', 'Green-Buff-Ownership'],
            timestamps
        ]
    }

    getVictoryMetrcisData(victoryMetricsJSON) {
        let victoryPointsRed = [];
        let victoryPointsBlue = [];
        let victoryPointsGreen = [];
        let timestamps = [];

        victoryMetricsJSON.forEach(victoryMetric => {
            let victoryMetrics = victoryMetric.victorymetrics;

            victoryPointsRed.push(victoryMetrics.red.victorypoints);
            victoryPointsBlue.push(victoryMetrics.blue.victorypoints);
            victoryPointsGreen.push(victoryMetrics.green.victorypoints);

            timestamps.push(victoryMetric.timestamp);
        });

        return [
            victoryPointsRed,
            victoryPointsBlue,
            victoryPointsGreen,
            ['Victory points red', 'Victory points blue', 'Victory points green'],
            timestamps
        ];
    }

    retrieveBuffOwnershipArrays(owner, ownerShipArray) {
        switch (owner) {
            case 'Green':
                ownerShipArray[0] = ownerShipArray[0]++;
                break;
            case 'Red':
                ownerShipArray[1] = ownerShipArray[0]++;
                break;
            case 'Blue':
                ownerShipArray[2] = ownerShipArray[2]++;
                break;
        }

        return ownerShipArray;
    }

    retrieveBuffOwner(map) {
        let buffOwner = null;

        if(map.bonuses.length > 0) {
            buffOwner = map.bonuses[0].owner;
        }

        return buffOwner;
    }

}

module.exports = new ChartDataRetriever();