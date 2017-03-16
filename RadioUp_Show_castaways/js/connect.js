var fs = require('fs'), MongoClient = require('mongodb').MongoClient;
var shows = require('apiclient');

//var argv = require('minimist')(process.argv.slice(2));

var url = 'mongodb://10.79.86.205:27017/RadioUp_Show_castaways';
//var db = new Db('shows', url);  

MongoClient.connect(url, function(err, db) {

    if( err !== null ){
        console.log("Could not connect to Mongodb at " + url)
        return;
    }

    item = {
        "id": 1,
        "headline": "Test Headline",
        "description": "Some Description",
        "link": "Some Link"
    }

    // item.id = 1;
    // item.headline = "Test Headline";
    // item.description = "Some Description";
    // item.link = "Some Link";
        

    var r = db.collection('shows').insertOne(item);

    db.close();
});