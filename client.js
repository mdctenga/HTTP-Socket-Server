var net = require('net');
var host = null;
var port = null;
var path = null;

parseURL(process.argv[2]);

function parseURL(url){
  var regex = /(\w+(?=:)):(\d+(?=\/))(\/\w+)/g;
  var result = regex.exec(url);
  console.log(result);
  host = result[1];
  port = result[2];
  path = result[3];
}

var client = net.connect({port: port, host: host}, function() { //'connect' listener
  console.log('connected to server!');
  console.log(path);
  var requestHeader = 'GET' + ' ' + path + ' ' + 'HTTP/1.1'+ '\r\n';
  requestHeader += 'Host: ' + host + '\r\n';
  requestHeader += 'Connection: keep-alive\r\n';
  requestHeader += 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8\r\n';
  requestHeader += 'Upgrade-Insecure-Requests: 1\r\n';
  requestHeader += 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.125 Safari/537.36\r\n';
  requestHeader += 'Accept-Encoding: gzip, deflate, sdch\r\n';
  requestHeader += 'Accept-Language: en-US,en;q=0.8\r\n';
  client.write(requestHeader);
});

client.on('data', function(response) {
  console.log(response.toString());
  client.end();
});

client.on('end', function() {
  console.log('disconnected from server');
});