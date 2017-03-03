// Private variables
var resilient = require('resilient');
var striptags = require('striptags');
var servers = [
    'https://tq42gvshs8.execute-api.us-east-1.amazonaws.com'

];
var client = resilient({ service: { basePath: '/dev/espn/headlines' }});
client.setServers(servers);
client.get(this.headlinesPath, function (err, res) {
    var myBody = JSON.parse(res.body);
    var newsHeadlines = "";
    for (var i = 0, len = myBody.message.headlines.length; i < len; i++) {
        headlineNumber = i + 1;
        newsHeadlines += "Headline " + headlineNumber + ": " + myBody.message.headlines[i].headline + " <break time=\"0.5s\" /> ";
    };
    console.log(newsHeadlines)
    //response.tellWithCard(myBody.message.headlines[0].headline);
    //response.tellWithCard(newsHeadlines);
});
