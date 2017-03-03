
var Espn = require("../lib/espn.js"); // node.js core module


describe('ESPN', function(){
    describe('#scoreboard()', function(){
        it('should return sports json', function(done){
            var espn = new Espn();
            espn.scoreboard(function (response) {
                var assert = require('assert');
                assert.equal(response.hasOwnProperty('sports'), true);
                done();
            });
        })
    })
});

