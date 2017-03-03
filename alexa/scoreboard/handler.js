'use strict';
var Espn = require('./lib/espn');
var espn = new Espn();

module.exports.espn = (event, context, callback) => {

  espn.scoreboard(function (res) {

    const response = {
      statusCode: 200,
      body: JSON.stringify({
        message: res,
        input: event,
      }),
    };

    callback(null, response);
  });


  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
}
