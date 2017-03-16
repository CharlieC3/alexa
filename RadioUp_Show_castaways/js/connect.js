var fs = require('fs'), MongoClient = require('mongodb').MongoClient;
var showsMethods = require('./apiclient');

var getShows = showsMethods.getShows;

//var argv = require('minimist')(process.argv.slice(2));

var url = 'mongodb://10.79.86.205:27017/RadioUp_Show_castaways';
var dbTable;
//var db = new Db('shows', url);  

function connecToDB() {
    MongoClient.connect(url, function(err, db) {


        if( err !== null ){
            console.log("Could not connect to Mongodb at " + url)
            return;
        }

        dbTable = db;
        // item = {
        //     "id": 1,
        //     "headline": "Test Headline",
        //     "description": "Some Description",
        //     "link": "Some Link"
        // }

        // item.id = 1;
        // item.headline = "Test Headline";
        // item.description = "Some Description";
        // item.link = "Some Link";
            

        //var r = db.collection('shows').insertOne(item);
    });

}

function closeDB(db) {

        db.close();
}


function insertToDB (item) {
    db.collection('shows').insertOne(item);
}


function allShows(){

    var showsJSON = getShows();

   //var shows = JSON.parse( showsJSON );
   //var allShows = [];

   console.log( "i am: ", typeof showsJSON )

   for(var i = 0; i < shows.length; i++) {
       // console.log("shows: ", shows[i] );

  //}
  // console.log(shows[i]);

  // var map = new Map;
  
  // for(var show in shows){
   
  }

getShowItems();