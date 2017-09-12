var socket = io.connect('http://localhost:4000');


socket.on('query1B1', function(){
  rom = '1B1'
  var temp = Math.floor(Math.random()*30);
  var light = Math.floor(Math.random()*90);
  var humidity = Math.floor(Math.random()*20);;
  var sound = Math.floor(Math.random()*20);

  socket.emit('serverData', [rom, temp, light, sound, humidity]);
})
