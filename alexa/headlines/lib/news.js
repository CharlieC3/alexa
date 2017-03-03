// Private variables
var resilient = require('resilient');
var servers = [
    'http://api.espn.com/v1/sports/news/headlines?apikey=_____'
];


// Class
function News() {

    // Member variables
    this.headlinesPath = '/sports/news/headlines?apikey=_____';

    /**
     * Retrieves the top headlines for ESPN.com
     */
    this.headlines = function(callback) {
        var client = resilient({ service: { basePath: '/v1' }});
        client.setServers(servers);
        client.get(this.headlinesPath, function (err, res) {

            // Output errors
            // Im not sure if this is the right way to do this in node
            if (err) {
                console.log(err)
            }

            if (res.status === 200) {
                // Return to the caller via a callback function
                return callback(res.data);
            }
            else {
                // Output anything else - not really sure if this is right
                console.log(res.data);
            }

        });
    };
}

module.exports = News;
