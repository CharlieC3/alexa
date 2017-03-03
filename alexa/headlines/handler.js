'use strict';
var News = require('./lib/news');
var news = new News();

module.exports.headlines = (event, context, callback) => {

  news.headlines(function (res) {

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
