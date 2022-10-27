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

const start = async function() {
  const result = await client.get('kathleen');
  console.log(result);
}

function doStuff() {
  start()
}
setInterval(doStuff, 1000); //time is in ms


console.log('Server running at http://127.0.0.1:3000/');

