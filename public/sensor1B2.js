var socket = io.connect('http://localhost:4000');

socket.on('query1B2', function(){
  rom = '1B2'
  var temp = 12;
  var light = Math.floor(Math.random()*90);
  var humidity = Math.floor(Math.random()*20);;
  var sound = Math.floor(Math.random()*20);

  socket.emit('serverData', [rom, temp, light, sound, humidity]);
})
