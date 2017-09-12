var express = require('express');
var socket = require('socket.io')

//App setup
var app = express();
var server = app.listen(4000, function(){
  console.log('listening to requests on port 4000')
});

var Temps = {
  '1B1': 16,
  '1B2': 53,
  '1T1': 4,
}

var Lights = {
  '1B1': 16,
  '1B2': 53,
  '1T1': 4,
}

var Sounds = {
  '1B1': 16,
  '1B2': 53,
  '1T1': 4,
}

var Humidities = {
  '1B1': 16,
  '1B2': 53,
  '1T1': 4,
}

// Static files
app.use(express.static('public'))

//Socket setup
var io = socket(server);

var myVar = setInterval(querySensors, 20);

function querySensors(){
  io.sockets.emit('query1B1')
  io.sockets.emit('query1B2')
  io.sockets.emit('query1T1')
}

//Say connected on connection
io.on('connection', function(socket){
  console.log('made socket connection', socket.id);

  socket.on('serverData', function(data){
    var thisRoom = data[0]
    var temp = data[1]
    var light = data[2]
    var sound = data[3]
    var humidity = data[4]

    Temps[thisRoom] = temp
    Lights[thisRoom] = "Light Level: " + light
    Sounds[thisRoom] = "Sound Level: " + sound
    Humidities[thisRoom] = "Humidity Level: " + humidity

    io.sockets.emit('update', [thisRoom, Temps[thisRoom], Lights[thisRoom], Sounds[thisRoom], Humidities[thisRoom]]);
  })
});
