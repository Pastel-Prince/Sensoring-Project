var socket = io.connect('http://localhost:4000');
var wave = 1;

socket.on('query1B2', function(){
  wave += 0.05;
  rom = '1B2'
  tempt = Math.floor(Math.sin(wave)*20);
  light = Math.floor(Math.random()*90);
  humidity = Math.floor(Math.random()*20);;
  sound = Math.floor(Math.random()*20);

  socket.emit('serverData', [rom, tempt, light, sound, humidity]);
})
