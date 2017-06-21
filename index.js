exports.handler = (event, context, callback) => {
    "use strict";

    const https = require("https");
    const http = require("http");


    try {

        if (event.session.new) {
            // New session
            console.log("New session");
        }

        console.log("Type: ", event.request.type);

        switch (event.request.type) {
            case "LaunchRequest": {
                // Launch request
                console.log("Launch request");

                getPenguinSpeech().then(speechData => {
                    "use strict";
                    console.log("Speech: ", speechData);

                    context.succeed(
                        generateResponse(
                            buildSpeechletResponse(speechData, true),
                            {}
                        )
                    );
                });
                break;
            }

            case "IntentRequest": {
                // Intent request
                console.log("Intent request");
                console.log(event.request.intent.name);

                switch (event.request.intent.name) {

                    case "PenguinNumber" : {
                        getPenguinNumbersSpeech(context);

                        break;
                    }

                    case "PenguinLocation" : {

                        getPenguinSpeech().then(speechData => {
                            "use strict";
                            console.log("Speech: ", speechData);

                            context.succeed(
                                generateResponse(
                                    buildSpeechletResponse(speechData, true),
                                    {}
                                )
                            );
                        });

                        break;
                    }

                    default : {
                        endSessionHandler("Default hit: Intent");
                    }
                }


                break;
            }

            case "SessionEndRequest": {
                // Session end request
                break;
            }

            default: {
                endSessionHandler("Default hit");
            }
        }

    } catch(error) {
        endSessionHandler("Catch hit");
    }


    function endSessionHandler(speech) {
        if (typeof speech === "undefined") {
            speech = "Good bye from the penguin finder.";
        }
        context.succeed(
            generateResponse(
                buildSpeechletResponse(speech, true),
                {}
            )
        );
    }
};


function getPenguinNumbersSpeech(context) {
    "use strict";

    let pengs = require("./NonCombat/Penguins");

    pengs.getPenguinNumbers().then( numOfPenguins => {
        context.succeed(
            generateResponse(
                buildSpeechletResponse(`There are ${numOfPenguins} penguins to spot this week.`, true),
                {}
            )
        );
    });

}

function getPenguinSpeech() {
    "use strict";

    let pengs = require("./NonCombat/Penguins");

    return pengs.getPenguinLocations().then((json) => {
        "use strict";
        let penguins = json.Activepenguin;

        let speech = "There are " + penguins.length + " this week. ";

        for (let i = 0; i < penguins.length; i++) {
            let _speech = "The " + penguins[i].name + " penguin was last spotted at " + penguins[i].last_location + ". ";

            speech += _speech;
        }

        return speech;
    });

}


// Helper functions
buildSpeechletResponse = (outputText, shouldEndSession) => {
    return {
        outputSpeech: {
            type: "PlainText",
            text: outputText
        },
        shouldEndSession: shouldEndSession
    }
};

generateResponse = (speechletResponse, sessionAttributes) => {
    return {
        version: "1.0",
        sessionAttributes: sessionAttributes,
        response: speechletResponse
    }
};

var pengs = require("./NonCombat/Penguins");

pengs.areThereWildyPenguins().then(data => {
    console.log(`Are there wildy penguins: ${data}`);
});

pengs.getWildyPenguinNumbers().then(data => {
    console.log(`Number of wildy penguins: ${data}`);
});

pengs.getWildyPenguinDetails().then(data => {
   console.log(`Wildy penguin locations: ${JSON.stringify(data)}`);
});