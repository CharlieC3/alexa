'use strict';

// Setup Table Data

// Audio Source - AWS Podcast : https://aws.amazon.com/podcasts/aws-podcast/
var audioData = [
    {
        'title' : 'Episode 140',
        'url' : 'https://feeds.soundcloud.com/stream/275202399-amazon-web-services-306355661-amazon-web-services.mp3'
    },
    {
        'title' : 'Episode 139',
        'url' : 'https://feeds.soundcloud.com/stream/274166909-amazon-web-services-306355661-aws-podcast-episode-139.mp3'
    }
];

// Sample Show - Mike and Mike
var showData = [
    {
        "id": 13614905,
        "published": "2015-09-10T14:26:44Z",
        "headline": "Mike & Mike 9/9 - Hour 1",
        "description": "Mike Greenberg and Mike Golic react to Serena Williams' defeat of Venus Williams at the US Open, the Mets' comeback win over the Nationals and more.",
        "duration": 2507,
        "mp3Link": "http://c.espnradio.com/audio/2544533/mikeandmikeinsider_2015-09-09-070133.mp3?ad_params=zones%3DPreroll%2CPreroll2%2CMidroll%2CMidroll2%2CMidroll3%2CMidroll4%2CMidroll5%2CMidroll6%2CPostroll%2CPostroll2%7Cstation_id%3D605"
    }, 
    {
        "id": 13614904,
        "published": "2015-09-09T14:34:17Z",
        "headline": "Mike & Mike 9/9 - Hour 2",
        "description": "Mike Greenberg and Mike Golic cover Serena Williams' win over Venus Williams in the US Open quarterfinals and chat with Monday Night Football's Jon Gruden about the Dolphins' potential, ESPN New York's Adam Rubin about Matt Harvey's performance against the Nationals and more.",
        "duration": 2505,
        "mp3Link": "http://c.espnradio.com/audio/2544564/mikeandmikeinsider_2015-09-09-080104.mp3?ad_params=zones%3DPreroll%2CPreroll2%2CMidroll%2CMidroll2%2CMidroll3%2CMidroll4%2CMidroll5%2CMidroll6%2CPostroll%2CPostroll2%7Cstation_id%3D605"
    }
];

// All shows
var allShows = [
    {
        "headline": "Mike & Mike",
        "links": {
            "api": {
                "shows": {
                    "href": "http://api-partners.espn.com/v1/audio/shows/2156024"
                }
            }
        }
    },
    {
        "headline": "Russillo & Kanell",
        "links": {
            "api": {
                "shows": {
                    "href": "http://api-partners.espn.com/v1/audio/shows/3375575"
                }
            }
        }
    },
    {
        "headline": "The Dan Le Batard Show with Stugotz",
        "links": {
            "api": {
                "shows": {
                    "href": "http://api-partners.espn.com/v1/audio/shows/10998047"
                }
            }
        }
    },
    {
        "headline": "Dari and Mel",
        "links": {
            "api": {
                "shows": {
                    "href": "http://api-partners.espn.com/v1/audio/shows/11000371"
                }
            }
        }
    },
    {
        "headline": "Weekend Blitz",
        "links": {
            "api": {
                "shows": {
                    "href": "http://api-partners.espn.com/v1/audio/shows/11308384"
                }
            }
        }
    },
    {
        "headline": "The Coach and Bretos",
        "links": {
            "api": {
                "shows": {
                    "href": "http://api-partners.espn.com/v1/audio/shows/11000601"
                }
            }
        }
    },
    {
        "headline": "Jeremy Schaap",
        "links": {
            "api": {
                "shows": {
                    "href": "http://api-partners.espn.com/v1/audio/shows/11308210"
                }
            }
        }
    },
    {
        "headline": "SC AllNight",
        "links": {
            "api": {
                "shows": {
                    "href": "http://api-partners.espn.com/v1/audio/shows/3467298"
                }
            }
        }
    },
    {
        "headline": "The Freddie Coleman Show",
        "links": {
            "api": {
                "shows": {
                    "href": "http://api-partners.espn.com/v1/audio/shows/10998375"
                }
            }
        }
    },
    {
        "headline": "The Sedano Show",
        "links": {
            "api": {
                "shows": {
                    "href": "http://api-partners.espn.com/v1/audio/shows/11000320"
                }
            }
        }
    }
];

var allData  = {
    audioData: audioData,
    showData: showData,
    allShows: allShows
}

// module.exports = audioData;
module.exports = allData;
