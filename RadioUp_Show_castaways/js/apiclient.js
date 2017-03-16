
var resilient = require('resilient');
var servers = [
    'http://api.espn.com'
];

//Return a list of shows
var getShows = function(callback) {

    var showsPath = '/audio/shows?apikey=r7gsmkjvz6b99tspg48swttq';
    var client = resilient({ service: { basePath: '/v1' }})
    client.setServers(servers)

    client.get(showsPath, function (err, res) {
      if (res.status === 200) {
        //console.log('Success:', res.data)
        return callback(res.data)
      } else {
        console.log('Error:', err)
        return callback(err)
      }
    })
}

// module.exports = getShows;

//Return a the recording for a given id
var getRecording = function(callback, id) {
    var recordPath = '/audio/shows/id/recordings?apikey=r7gsmkjvz6b99tspg48swttq';
    var client = resilient({ service: { basePath: '/v1' }})
    client.setServers(servers)

    client.get(recordPath, function (err, res) {
      if (res.status === 200) {
        console.log('Success:', res.data)
        return callback(res.data)
      } else {
        console.log('Error:', err)
        return callback(err)
      }
    })

}


module.exports = { getShows, getRecording };
//getShows()



