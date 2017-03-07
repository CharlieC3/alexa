"use strict";

module.exports = Object.freeze({
    
    // App-ID. TODO: set to your own Skill App ID from the developer portal.
    appId : 'amzn1.ask.skill.2c243ffb-7df2-4179-a73d-e54536fef738',
        
    // API 
    // Get list of shows
    // http://api.espn.com/v1/audio/shows
    // Get Show
    // http://api.espn.com/v1/audio/shows/2156024
    // wiht recordings
    // getRecording 
    // http://api.espn.com/v1/audio/shows/2156024/recordings?limit=3&apikey=r7gsmkjvz6b99tspg48swttq

    // API Key
    apikey : 'r7gsmkjvz6b99tspg48swttq',
    // API show endpoint
    showAPI : 'http://api.espn.com/v1/audio/shows/',
    //  DynamoDB Table name
    dynamoDBTableName : 'showTable-DynamoDB',
    /*
     *  States:
     *  START_MODE : Welcome state when the audio list has not begun.
     *  PLAY_MODE :  When a playlist is being played. Does not imply only active play.
     *               It remains in the state as long as the playlist is not finished.
     *  RESUME_DECISION_MODE : When a user invokes the skill in PLAY_MODE with a LaunchRequest,
     *                         the skill provides an option to resume from last position, or to start over the playlist.
     */
    states : {
        START_MODE : '',
        PLAY_MODE : '_PLAY_MODE',
        RESUME_DECISION_MODE : '_RESUME_DECISION_MODE'
    }
});
