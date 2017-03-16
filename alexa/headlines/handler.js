'use strict';
var News = require('./lib/news');
var news = new News();
var AWS = require('aws-sdk');
AWS.config.update({region:'us-east-1'});
var dynamodb = new AWS.DynamoDB();
var tableName = 'espn-alexa'
var util = require( "util" );

module.exports.headlines = (event, context, callback) => {

    news.headlines(function (res) {

        // After the query is executed, insert the data into dynamodb
        res['headlines'].forEach(function (article) {
            var params = {
                Item: {
                    "headline_id": {
                        S: util.format( "%s", article['id'] )
                    },
                    "headline": {
                        S: util.format( "%s", article['title'] )
                    },
                    "story": {
                        S: util.format( "%s", article['story'] )
                    }
                },
                ReturnConsumedCapacity: "TOTAL",
                TableName: util.format( "%s", tableName )
            };
            dynamodb.putItem(params, function(err, data) {
                if (err) {
                    console.log(err, err.stack);
                }
                else {
                    console.log(data);
                }
            });
        });

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



