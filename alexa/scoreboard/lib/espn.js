// Private variables
var resilient = require('resilient');
var servers = [
    'http://site.api.prod.espninfra.starwave.com'
];


// Class
function Espn() {

    // Member variables
    this.scoreboardPath = '/scoreboard/header';

    /**
     * Retrieves scoreboard data
     */
    this.scoreboard = function(callback) {
        var client = resilient({ service: { basePath: '/apis/v2' }});
        client.setServers(servers);
        client.get(this.scoreboardPath, function (err, res) {
            if (err) {
                console.log(err)
            }
            if (res.status === 200) {
                return callback(res.data);
            }
            else {
                console.log(res.data);
            }

        });
    };
}
module.exports = Espn;
