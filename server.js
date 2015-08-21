var net = require('net');
var server = net.createServer(function(c) { //'connection' listener
  console.log('client connected');
  c.on('end', function() {
    console.log('client disconnected');
  });
  c.write('Access-Control-Allow-Origin: *');
  c.pipe(c);
});
server.listen(8080, function() { //'listening' listener
  console.log('server bound');
});