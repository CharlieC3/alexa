var fs = require('fs'), MongoClient = require('mongodb').MongoClient;
var showsMethods = require('./apiclient');

var getShows = showsMethods.getShows;

//var argv = require('minimist')(process.argv.slice(2));

var url = 'mongodb://10.79.86.205:27017/RadioUp_Show_castaways';
var dbTable;

function insertToDB(items) {
    MongoClient.connect(url, function(err, db) {
      cleanDB(db);

        if( err !== null ){
            console.log("Could not connect to Mongodb at " + url)
            return;
        }

        console.log("Connected to db at " + url);

        for(var i = 0; i < items.length; i++) {
            db.collection('shows').insertOne(items[i]);
        }

        db.close();
    });

}


function writeShowItems(data){

   var shows = data.shows;
   var allShows = [];

   for(var i = 0; i < shows.length; i++) {
        var show = shows[i];
       allShows.push({
        "id": show.id,
        "headline": show.headline,
        "link": show.links.api.recordings.href
       })

    }

    insertToDB(allShows);

  // console.log( allShows );
}

function cleanDB(db){
  db.collection('shows').remove();
}


getShows( writeShowItems )
