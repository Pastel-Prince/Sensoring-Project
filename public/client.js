//Make connection
var socket = io.connect('http://localhost:5000');

// Query DOM
var temp = document.getElementById('Temperature');
    Title = document.getElementById('title')
    lightlevel = document.getElementById('LightLevel')
    soundlevel = document.getElementById('SoundLevel')
    humiditylevel = document.getElementById('HumidityLevel'),
    dataElement = document.getElementById('dataView')

var room = '1B1'

$('.innerBox').click(function(){
  if($(this).parent().attr('id') == 'Level2'){
    var level = '2'
  }
  if($(this).parent().attr('id') == 'Level1'){
    var level = '1'
  }

  room = String((level + $(this).attr('id')))
  title.innerHTML = (level + $(this).attr('id'))
  socket.emit('update', room)
})

socket.on('update', function(data){
  // TODO: Currently we don't send the room... to be added
  // if(data[0] == room){
    dataElement.innerHTML = data["lightLevel"]
    console.log(data["lightLevel"]);
  // }
})
