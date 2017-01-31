var express = require('express');
var childProcess = require('child_process');



var app = express();
app.use("/css",express.static(__dirname + '/css')); 
app.use("/images",express.static(__dirname + '/images')); 



//------------------------------------------------------------
app.get('/', function(req, res) {
	res.setHeader('Content-Type', 'text/html');
	res.sendFile(__dirname + '/index.html');
});


//------------------------------------------------------------
app.use(function(req, res, next){
	res.setHeader('Content-Type', 'text/plain');
	res.status(404).send('Page introuvable !');
});



//------------------------------------------- SMS HANDLE

var smsReceived = [];

var smsDaemon = childProcess.exec('sudo python sms.py');
smsDaemon.stdout.on('data',function(data){
	var smsParts = data.split("\t");
	smsReceived.push({ 
		from: smsParts[0], 
		date: smsParts[1], 
		content: smsParts[2].trim() 
	});
	console.log(smsReceived);
});
smsDaemon.stderr.on('data',function(data){
	// Pour le debug, avec la ligne logging décommentée dans sms.py
    // console.log("err: "+data); 
});








var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on('connection', function(socket){

	socket.on("...", function(data) {
	});

	socket.on('disconnect', function(){

	});

});



http.listen(8080);

