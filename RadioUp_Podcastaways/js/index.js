'use strict';

var Alexa = require('alexa-sdk');
var constants = require('./constants');
var stateHandlers = require('./stateHandlers');
var audioEventHandlers = require('./audioEventHandlers');

exports.handler = function(event, context, callback){
    // init alexa handler
    var alexa = Alexa.handler(event, context);
    // get AppId
    alexa.APP_ID = constants.appId;
    // tabl
    alexa.dynamoDBTableName = constants.dynamoDBTableName;
    
    alexa.registerHandlers(
        stateHandlers.startModeIntentHandlers,
        stateHandlers.playModeIntentHandlers,
        stateHandlers.resumeDecisionModeIntentHandlers,
        stateHandlers.remoteControllerHandlers,
        audioEventHandlers
    );
    alexa.execute();
};
