// We need to 'require' the following modules                                                                                                            
var express = require("express"),
    http = require("http"),
    path = require("path"),
    redisClient = require("redis").createClient(),
    app = express(),
    twitterWorker = require("./twitter.js");
    
    
//Create arrays to track happy and sad
var happyWords = ["cheerful","chipper","content","happy","ecstatic","elated","glad","joyful","merry","pleased"],
    sadWords = ["sad","dismal","distressed","heartbroken","morbid","morose","somber","sorrowful","glum","dejected"],
    allWords = ["cheerful","chipper","content","happy","ecstatic","elated","glad","joyful","merry","pleased","sad","heartbroken","morbid","morose","somber","sorrowful","glum","dejected"];


// This is our basic configuration                                                                                                                     
app.configure(function () {
    // Define our static file directory, it will be 'public'                                                                                           
    "use strict";
    app.use(express.static(path.join(__dirname, 'public')));
});

// Create the http server and get it to listen on the specified port 3000                                                                                                                                                                                                                                
http.createServer(app).listen(3000, function(){
    console.log("Express server listening on port 3000");
});

//Create twitterWorker
twitterWorker(allWords); //create the single array and pass it here

app.get("/", function (req, res) {
    //send "Hello World" to the client as html
    res.send("Hello World!!!!!!");
});

app.get("/goodbye", function (req, res) {
    //send "Goodbye World" to the client as html
    res.send("Goodbye World!");
});

 app.get("/counts.json", function	(req, res) {
    redisClient.mget(allWords, function	(error, count) {
    var results = []; 
	if (error !== null) {
            // handle error here
            console.log("ERROR: " + error);
        } else {
            for (var i=0; i<allWords.length; i++){             
              results.push({
              "key":allWords[i],
              "value":count[i]        
  });        
                
            // use res.json to return JSON objects instead of strings
            
        }
    }res.json(results);
    });
});