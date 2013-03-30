var http = require('http');

var numberOfServerHits = 0; //this will store the number of times a server is pinged

http.createServer(function (req, res) { //this is a JSON call!
    res.writeHead(200, {'Content-Type': 'text/plain'});
    numberOfServerHits++; //this will increment every time the server is pinged
    res.write("First Line!"); //this will write to the website
    res.end('Hello World!\n');
}).listen(3000);

console.log('Server running on port 3000');


