//Make connection
var socket = io.connect('http://localhost:4000');

// Query DOM
var temp = document.getElementById('Temperature');
    Title = document.getElementById('title')
    lightlevel = document.getElementById('LightLevel')
    soundlevel = document.getElementById('SoundLevel')
    humiditylevel = document.getElementById('HumidityLevel')

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
  if(data[0] == room){
    temp.innerHTML = data[1]
    lightlevel.innerHTML = data[2]
    soundlevel.innerHTML = data[3]
    humiditylevel.innerHTML = data[4]
  }
})
