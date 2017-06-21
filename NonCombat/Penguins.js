"use strict";
let fetch = require("node-fetch");

const API_URL = "http://2016.world60pengs.com/rest/cache/actives.json";

exports.getPenguinLocations = function() {
    "use strict";

    return fetchPenguinLocations();
};

exports.getPenguinNumbers = function() {
    let pengNumbersPromise = new Promise((resolve, reject) => {
        fetchPenguinLocations().then(data => {
            resolve(data.Activepenguin.length);
        });
    });

    return pengNumbersPromise;
};

exports.areThereWildyPenguins = function() {
    return new Promise((resolve, reject) => {
        fetchPenguinLocations().then(penguins => {
            let filteredPengs = penguins.Activepenguin.filter((penguin) => {
                if (penguin.name === "Wilderness") {
                    return penguin;
                }
            });

            if (filteredPengs === undefined || filteredPengs.length < 1) {
                resolve(false);
            }
            resolve(true);
        });
    });
};

exports.getWildyPenguinNumbers = function() {
    return new Promise((resolve, reject) => {
        fetchPenguinLocations().then(penguins => {
            let filteredPengs = penguins.Activepenguin.filter((penguin) => {
                if (penguin.name === "Wilderness") {
                    return penguin;
                }
            });

            if (filteredPengs === undefined || filteredPengs.length < 1) {
                resolve(0);
            }
            resolve(filteredPengs.length);
        });
    });
};

exports.getWildyPenguinDetails = function() {
    return new Promise((resolve, reject) => {
        fetchPenguinLocations().then(penguins => {
            let filteredPengs = penguins.Activepenguin.filter((penguin) => {
                if (penguin.name === "Wilderness") {
                    return penguin;
                }
            });

            if (filteredPengs === undefined || filteredPengs.length < 1) {
                resolve(undefined);
            }
            resolve(filteredPengs);
        });
    });
};

function fetchPenguinLocations() {
    "use strict";

    return fetch("http://2016.world60pengs.com/rest/cache/actives.json?_=1490474932011").then(function(response) {
        return response.json();
    });

}