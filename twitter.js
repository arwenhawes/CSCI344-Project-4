var worker = function(allWords) {
    "use strict";
    /*global console: false, require: false, window: false */
    var redisClient = require("redis").createClient(),
        twitter = require("ntwitter"),
        credentials = require("./credentials.js"),

        t = new twitter({
            consumer_key: credentials.consumer_key,
            consumer_secret: credentials.consumer_secret,
            access_token_key: credentials.access_token_key,
            access_token_secret: credentials.access_token_secret
        });

    t.stream(
        'statuses/filter',
        { track: allWords }, //allWords passed in
        function(stream) {
            stream.on('data', function(tweet) {
                console.log(tweet.text);
            //goes through each word in the array and increases the count if it's tweeted                                                                                                                                                                        
            for (var i=0; i<allWords.length; i++){
            if(tweet.text.indexOf(allWords[i] >-1)) { //switch to indexOf instead of match 
                redisClient.incr(allWords[i]); //need to change this to go through the array and store the # for each
            }
          }
        });
      }
  );
}

module.exports = worker;