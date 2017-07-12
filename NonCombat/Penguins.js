"use strict";
let fetch = require("node-fetch");

const API_URL = "http://2016.world60pengs.com/rest/cache/actives.json";

exports.getPenguinLocations = function() {
    "use strict";

    return getWildyPenguinDetails();
};

exports.getWildyPenguinNumbers = function() {
    return getWildyPenguinNumbers();
};

exports.areThereWildyPenguins = function() {
    return areThereWildyPenguins();
};

exports.getWildyPenguinNumbers = function() {
    return wildyPenguinNumbers();
};

exports.getWildyPenguinDetails = function() {
    return getWildyPenguinDetails();
};

function getWildyPenguinNumbers() {
    return new Promise((resolve, reject) => {
        fetchPenguinLocations().then(data => {
            resolve(data.Activepenguin.length);
        });
    });
}

function areThereWildyPenguins() {
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
}

function wildyPenguinNumbers() {
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
}

getWildyPenguinDetails().then(data => {
    console.log(data)
})

function getWildyPenguinDetails() {
    return new Promise((resolve, reject) => {
        fetchPenguinLocations().then(penguins => {

            let filteredPengs = penguins.Activepenguin.filter((penguin) => {
                if (penguin.name === "Wilderness") {
                    return penguin;
                }
            });

            if (filteredPengs === undefined || filteredPengs.length < 1) {
                resolve([]);
            }
            resolve(filteredPengs);
        });
    });
}

function fetchPenguinLocations() {
    "use strict";

    return fetch("http://2016.world60pengs.com/rest/cache/actives.json?_=1490474932011").then(function(response) {
        return response.json();
    });

}