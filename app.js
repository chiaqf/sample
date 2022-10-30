//var http = require('http');
//http.createServer(function (req, res) {
//  res.writeHead(200, {'Content-Type': 'text/plain'});
//  res.end('How you doin?\n');
//}).listen(3000, '127.0.0.1');

const redis = require("redis");

let redisPort = 6379;  // Replace with your redis port
let redisHost = "127.0.0.1";  // Replace with your redis host
const client = redis.createClient({
    socket: {
      port: redisPort,
      host: redisHost,
    }
  });

(async () => {
    // Connect to redis server
    await client.connect();
})();


console.log("Attempting to connect to redis");
client.on('connect', () => {
    console.log('Connected!');
});


var express = require('express');
var app = express();
app.get('/lol', function(req, res) {   
   console.log("Got a GET request for /ab*cd");
   res.send('Page Pattern Match');
   const start = async function() {
     const result = await client.get('kathleen');
     console.log(result);
     res.send(result);
   }
   
   function doStuff() {
     start()
   }
   setInterval(doStuff, 1000); //time is in ms

})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})

