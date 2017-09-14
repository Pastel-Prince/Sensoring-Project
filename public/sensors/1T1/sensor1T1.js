var socket = io.connect('http://localhost:4000');


socket.on('query1T1', function(){
  rom = '1T1'
  tempt = Math.floor(Math.random()*90);
  light = Math.floor(Math.random()*90);
  humidity = Math.floor(Math.random()*20);;
  sound = Math.floor(Math.random()*20);

  socket.emit('serverData', [rom, tempt, light, sound, humidity]);
})
