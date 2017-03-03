var News = require("../lib/news.js"); // node.js core module

describe('ESPN News', function(){
    describe('#headlines()', function(){
        it('should return 10 records', function(done){
            var news = new News();
            news.headlines(function (response) {
                var assert = require('assert');
                assert.equal(response.headlines.length, 10);
                done();
            });
        })
    })
});

