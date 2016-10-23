// var app = require('express')();
// var http = require('http').Server(app);
// var io = require('socket.io')(http);

// app.get('/', function(req, res){
//   res.sendFile(__dirname + '/index.html');
// });


// io.on('connection', function(socket){
//   console.log("user connected")
//   socket.on('agenda', function(msg){
//   	console.log("emmited socket");
//     io.emit('agenda', msg);
//   });
//   socket.on('agenda', function(msg){
//   	console.log("emmited socket");
//     io.emit('agenda', msg);
//   });
//   socket.on('agenda', function(msg){
//   	console.log("emmited socket");
//     io.emit('agenda', msg);
//   });    
// });
// http.listen(3000, function(){
//   console.log('listening on *:3000');
// });
var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var bodyParser = require('body-parser');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
var flock = require('flockos');

app.set('json spaces', 40);
flock.setAppId('95e17ae0-5a1e-4d7f-a5f9-82f3a33065b9');
flock.setAppSecret('87cb9708-6f8b-4220-8313-df3d773362f9');

app.use(flock.eventTokenChecker);
app.get('/', function(req, res){
  res.sendFile(__dirname + '/serveClient.html');
});

// flock.callMethod('chat.sendMessage', "fc47aa3b-baa6-4172-9319-8dca1eda83c6", {
//     to: 'g:cfc76545-3400-4864-892a-513a9f4ae409',
//     text: 'hello im bot'
// }, function (error, response) {
//     if (!error) {
//         console.log(response);
//     }
// });

// var agendas = [];
var stuff = {"agendas": [],
              "notes" : [],
              "actions" :[]
            }

var JSONagendas = stuff.agendas;
var JSONnotes   = stuff.notes;
var JSONactions = stuff.actions;

app.get('/getStuff',function(req,res){
  // agendas.push("hie");
  // agendas.push("hello");
  res.json(stuff);
});
// flock.callMethod('chat.sendMessage', "7a22271c-765d-4c62-b994-3d8fcb72b8ac", {
//     to: 'g:81619_lobby',
//     text: '.',
//     flockml : '<flockml>--------------------------------------------------<br/>|<i><strong>Hello Team</strong></i><br/>|<i>Here"s what happened in todays meeting</i><br/>|<b><u>Agenda:</u></b><br/>|*agenda1 <br/>|*agenda2<br/><b><u>Notes:</u></b><br/>|*this is important <br/>|*@sainath: How can that be not important<br/>--------------------------------------------------<br/></flockml>' 
// }, function (error, response) {
//     if (!error) {
//         console.log(response);
//     }
// });


// flock.callMethod('groups.list', "7a22271c-765d-4c62-b994-3d8fcb72b8ac", {
//     token: '7a22271c-765d-4c62-b994-3d8fcb72b8ac'
// }, function (error, response) {
//     if (!error) {
//         console.log(response);
//     }
// });


app.post('/listeningEventshere',function(req,res){
  console.log("hitted event listening URL");
  console.log(req.body);
  // console.log("res header",res.header);
  res.send();

});

io.on('connection', function(socket){
  console.log("user connected")
  socket.on('agenda', function(msg){
  	console.log("emmited socket");
    JSONagendas.push(msg);
    console.log(JSONagendas);
    io.emit('agenda', msg);
  });
  socket.on('note', function(msg){
  	console.log("emmited socket");
    JSONnotes.push(msg);
    console.log(JSONnotes);
    io.emit('note', msg);
  });
  socket.on('action', function(msg){
  	console.log("emmited socket");
    JSONactions.push(msg);
    console.log(JSONactions);
    io.emit('action', msg);
  });    
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});