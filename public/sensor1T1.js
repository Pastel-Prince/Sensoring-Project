var socket = io.connect('http://localhost:4000');

socket.on('query1T1', function(){
  rom = '1T1'
  var temp = Math.floor(Math.random()*20);
  var light = Math.floor(Math.random()*90);
  var humidity = Math.floor(Math.random()*20);;
  var sound = Math.floor(Math.random()*20);

  socket.emit('serverData', [rom, temp, light, sound, humidity]);
})
