var server = require('websocket').server, http = require('http');

var socket = new server({  
    httpServer: http.createServer().listen(1337)
});

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


socket.on('request', function(request) {  
    var connection = request.accept(null, request.origin);

    const start = async function() {
      //const result = await client.xrevrange('kathleen');
      //const result = await client.xrevrange('random100', '+', '-', 'COUNT', 1);
      const result = await client.sendCommand(['XREVRANGE', 'random100', '+', '-', 'COUNT', '1']); // 'OK' 
      const [temp] = result;
      const [id,data] = temp;
      const [ts,ts_val,random,random_val] = data;
      const epoch_now = Date.now()/1000;
      const difference = epoch_now - ts_val; 
      connection.sendUTF("latency : " + difference);
      connection.sendUTF("ts     : " + ts_val + " value : " + random_val);
      return difference;
    }

    const diff = start();
    diff.then(function(result) {
        console.log(result);
	const delay = 1000 - result*1000 + 50;
	console.log(delay);
	//setTimeout(start, delay);
        setTimeout(function(){
            setInterval(function() {
                start();
            },1000);
        },delay);
	//setInterval(start, 1000 + );
    });

    connection.on('close', function(connection) {
        console.log('connection closed');
    });
});
