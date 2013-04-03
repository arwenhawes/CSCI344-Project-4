var express = require("express"),
    http = require("http"),
    path = require("path"),
    redisClient = require("redis").createClient(),
    app = express();

//create redis client                                                                                                                                                                                                                       
var client = redis.createClient();

//Create arrays to track happy and sad
var happyWords = ["happy", "cheerful","chipper","content","ecstatic","elated","glad","joyful","merry","pleased"];
var sadWords = ["sad","dismal","distressed","heartbroken","morbid","morose","somber","sorrowful","glum","dejected"];


var t = new twitter({
    consumer_key: credentials.consumer_key,
    consumer_secret: credentials.consumer_secret,
    access_token_key: credentials.access_token_key,
    access_token_secret: credentials.access_token_secret
});

http.createServer(function (req, res) {
    client.get("awesome", function (error, awesomeCount) {
        if (error !== null) {
            //handle error here
            console.log("error: " + error);
        } else {
            res.writeHead(200, {"Content-Type": "text/plain"});
            res.end("The awesome count is " + awesomeCount);
        }
    });

client.get("awesome", function (error, awesomeCount) {
    if (error !== null) {
        //handle error here
        console.log("error: " + error);
    } else {
        res.writeHead(200, {"Content-Type": "text/plain"});
        res.end("The awesome count is " + awesomeCount);
    } 
});

}).listen(3000);

t.stream(
    'statuses/filter',
    { track: [happyWords,sadWords] },
    function(stream) {
        stream.on('data', function(tweet) {
            console.log(tweet.text);
            //if awesome is in the tweet text, increment the counter                                                                                                                                                                        
            if(tweet.text.match(/awesome/)) {
                client.incr('awesome');
            }
        });
    }
);