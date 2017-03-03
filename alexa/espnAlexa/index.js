/**
 Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

 http://aws.amazon.com/apache2.0/

 or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 */

/**
 * This simple sample has no external dependencies or session management, and shows the most basic
 * example of how to create a Lambda function for handling Alexa Skill requests.
 *
 * Examples:
 * One-shot model:
 *  User: "Alexa, tell Hello World to say hello"
 *  Alexa: "Hello World!"
 */

/**
 * App ID for the skill
 */
var APP_ID = undefined; //replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * EspnAlexaSkill is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var EspnAlexaSkill = function () {
  AlexaSkill.call(this, APP_ID);
};

function getSport( sport ){
  sport = sport.toLowerCase();
  if( sport === "college basketball"){
    sport = "mens-college-basketball";
  }
  return sport;
}

// Extend AlexaSkill
EspnAlexaSkill.prototype = Object.create(AlexaSkill.prototype);
EspnAlexaSkill.prototype.constructor = EspnAlexaSkill;

EspnAlexaSkill.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
  console.log("EspnAlexaSkill onSessionStarted requestId: " + sessionStartedRequest.requestId
      + ", sessionId: " + session.sessionId);
  // any initialization logic goes here
};

EspnAlexaSkill.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
  console.log("EspnAlexaSkill onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
  var speechOutput = "Welcome to the Alexa Skills Kit, you can say hello";
  var repromptText = "You can say hello";
  response.ask(speechOutput, repromptText);
};

EspnAlexaSkill.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
  console.log("EspnAlexaSkill onSessionEnded requestId: " + sessionEndedRequest.requestId
      + ", sessionId: " + session.sessionId);
  // any cleanup logic goes here
};

var ESPN = {}
ESPN.getLeagues = function(callback){
  var leagues = []
  var request = require('request');
  request('https://wx1buj2mhi.execute-api.us-east-1.amazonaws.com/dev/espn/scoreboard', function (err, res, body) {

    var myBody = JSON.parse(body);

    myBody.message.sports.forEach(function (sport,i) {
        console.log( sport.leagues.length )
        sport.leagues.forEach(function (league,i){
          leagues.push(league)
        })
    });

    callback(leagues);
  });
  
}

EspnAlexaSkill.prototype.intentHandlers = {
  // register custom intent handlers

  "EspnAskLiveGamesBySport": function (intent, session, response) {
    // Private variables

    var text = "";
    ESPN.getLeagues(function(leagues){

      leagues.forEach(function (league,i){
        if( league.shortName.toLowerCase() === getSport(intent.slots.sport.value)){

          league.events.forEach(function( event,i){
           
            if( event.status === "in"){

              if( parseInt(event.competitors[0].score) > parseInt(event.competitors[1].score) ){
                text += event.competitors[0].name + " are leading " + event.competitors[1].name + " <break time=\"0.2s\" />," + event.competitors[0].score + " to " + event.competitors[1].score + " <break time=\"0.5s\" />"
              }else if(parseInt(event.competitors[1].score) > parseInt(event.competitors[0].score)){
                text += event.competitors[1].name + " are leading " + event.competitors[0].name + " <break time=\"0.2s\" />," + event.competitors[1].score + " to " + event.competitors[0].score + " <break time=\"0.5s\" />"
              }else{
                text += event.competitors[0].name + " and " + event.competitors[1].name + " are tied at " + event.competitors[1].score + " <break time=\"0.5s\" />";
              }
            }
          });
        }
      });
      var speechOutput = {
        speech: "<speak>" + text + "</speak>",
        type: AlexaSkill.speechOutputType.SSML
      };

      response.tellWithCard(speechOutput);
    });

  },

  "EspnAskTopScoresBySport": function (intent, session, response) {
    // Private variables

    var text = "";
    ESPN.getLeagues(function(leagues){

      leagues.forEach(function (league,i){
        if( league.shortName.toLowerCase() === getSport(intent.slots.sport.value)){

          league.events.forEach(function( event,i){
           
            if( event.status === "post"){
              var scoreDiff = Math.abs(event.competitors[0].score - event.competitors[1].score);

              var descriptor = "beat";
              if( scoreDiff < 4 ){
                descriptor = "edged"
              }

              if( parseInt(event.competitors[0].score) > parseInt(event.competitors[1].score) ){
                text += event.competitors[0].name + " " + descriptor + " " + event.competitors[1].name + " <break time=\"0.2s\" />," + event.competitors[0].score + " to " + event.competitors[1].score + " <break time=\"0.5s\" />"
              }else if(parseInt(event.competitors[1].score) > parseInt(event.competitors[0].score)){
                text += event.competitors[1].name + " " + descriptor + " " + event.competitors[0].name + " <break time=\"0.2s\" />," + event.competitors[1].score + " to " + event.competitors[0].score + " <break time=\"0.5s\" />"
              }
            }
          });
        }
      });
      var speechOutput = {
        speech: "<speak>" + text + "</speak>",
        type: AlexaSkill.speechOutputType.SSML
      };

      response.tellWithCard(speechOutput);
    });

  },

  "EspnAskTopGamesBySport": function (intent, session, response) {
    // Private variables
    var gamesText = "";
    ESPN.getLeagues(function(leagues){

      leagues.forEach(function (league,i){
         
          if( league.shortName.toLowerCase() === getSport(intent.slots.sport.value)){
            league.events.forEach(function( event,i){
              gamesText += event.competitors[1].name + " versus " + event.competitors[0].name + " <break time=\"0.5s\" /> "
            });

            var speechOutput = {
                speech: "<speak>" + gamesText + "</speak>",
                type: AlexaSkill.speechOutputType.SSML
              };

              response.tellWithCard(speechOutput);
            }
      });
    });

  },

  "EspnAskHeadlinesIntent": function (intent, session, response) {
    // Private variables
    var striptags = require('striptags');
    var resilient = require('resilient');
    var servers = ['https://tq42gvshs8.execute-api.us-east-1.amazonaws.com'];
    var client = resilient({ service: { basePath: '/dev/espn/headlines' }});

    client.setServers(servers);
    client.get(this.headlinesPath, function (err, res) {
      var myBody = JSON.parse(res.body);
      var newsHeadlines = "";
      for (var i = 0, len = myBody.message.headlines.length; i < len; i++) {
        headlineNumber = i + 1;
        newsHeadlines += "Headline " + headlineNumber + ": " + myBody.message.headlines[i].headline + " <break time=\"0.5s\" /> ";
      };

      var speechOutput = {
        speech: "<speak>" + newsHeadlines + "</speak>",
        type: AlexaSkill.speechOutputType.SSML
      };

      //response.tellWithCard(myBody.message.headlines[0].headline);
      response.tellWithCard(speechOutput);
    });
  },

  "EspnRandomHeadlineIntent": function (intent, session, response) {
    var sessionAttributes = session.attributes;
    var result = sessionAttributes.text;
    var story = story || "Sorry, a problem occurred attempting to retrieve the story."
    console.log(result);
    console.log(sessionAttributes);
    console.log(response);

    // Private variables
    var striptags = require('striptags');
    var resilient = require('resilient');
    var servers = ['https://tq42gvshs8.execute-api.us-east-1.amazonaws.com'];
    var client = resilient({ service: { basePath: '/dev/espn/headlines' }});

    client.setServers(servers);
    client.get(this.headlinesPath, function (err, res) {

      // Check if we are in a session, and if so then reprompt for yes or no
      if (!session.attributes['story']) {
        // Get a random headline from current headlines
        console.log("Asking initial question");
        var myBody = JSON.parse(res.body);
        var headlineIndex = Math.floor(Math.random() * myBody.message.headlines.length);
        var randomHeadline = myBody.message.headlines[headlineIndex].headline;
        session.attributes['story'] = striptags(myBody.message.headlines[headlineIndex].story);

        var speechOutput = {
          speech: "<speak>" + randomHeadline + "</speak>",
          type: AlexaSkill.speechOutputType.SSML
        };

        var repromptOutput = {
          speech: "To expand on this story, say: expand story.",
          type: AlexaSkill.speechOutputType.PLAIN_TEXT
        };

        //response.tellWithCard(myBody.message.headlines[0].headline);
        response.ask(speechOutput, repromptOutput);
        return;
      }
      else {
        var speechOutput = {
          speech: "<speak>" + session.attributes['story'] + "</speak>",
          type: AlexaSkill.speechOutputType.SSML
        };
        response.tellWithCard(speechOutput);
      }
    });
  },

  "AMAZON.HelpIntent": function (intent, session, response) {
    response.tell("You can ask me the headlines or a random headline.");
  }
};

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
  // Create an instance of the EspnAlexaSkill skill.
  var espnAlexSkill = new EspnAlexaSkill();
  espnAlexSkill.execute(event, context);
};

