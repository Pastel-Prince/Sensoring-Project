// Make connection
var socket = io.connect('http://localhost:5000');

// Query DOM
var dataElement = document.getElementById('dataView');

// Sets default room to 1b1
var currentRoom = '1B1';

// When you click a room it sets the room to the currently viewed room
$('.room').click(function() {
	currentRoom = ($(this).text()).replace(/\s/g, '');
});

socket.on('update', function(packet) {

	if(currentRoom == packet["room"]) {
        var data = packet["data"];
		switch(currentData) {
			case "Temperature":
				dataElement.innerHTML = data["temperature"];
				break;
			case "Light Level":
				dataElement.innerHTML = data["lightLevel"];
				break;
			case "Noise Level":
				dataElement.innerHTML = data["soundLevel"];
				break;
			case "Humidity":
				dataElement.innerHTML = data["humidity"];
				break;
		}
	}
})
