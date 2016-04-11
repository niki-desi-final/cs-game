var express = require('express');
var app = express();
var port = 8080;
var server = app.listen(port);

var ServerManager = require('./server/ServerManager');

app.use(express.static(__dirname + '/client'));

console.log('http://localhost:' + port);

var sm = new ServerManager(server);
sm.startServer();

