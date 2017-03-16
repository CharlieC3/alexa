
var resilient = require('resilient');
var servers = [
    'http://api.espn.com'
];


function getShows() {
    var showsPath = '/audio/shows?apikey=r7gsmkjvz6b99tspg48swttq';
    var client = resilient({ service: { basePath: '/v1' }})
    client.setServers(servers)

    client.get(showsPath, function (err, res) {
      if (res.status === 200) {
        console.log('Success:', res.data)
        return res.data
      } else {
        console.log('Error:', err)
        return err
      }
    })

}

//getShows()



