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

var mostRecentData = [];

function update() {
    roomData = mostRecentData[currentRoom];
    switch(currentData) {
        case "Temperature":
            dataElement.innerHTML = roomData["temperature"];
            break;
        case "Light Level":
            dataElement.innerHTML = roomData["lightLevel"];
            break;
        case "Noise Level":
            dataElement.innerHTML = roomData["soundLevel"];
            break;
        case "Humidity":
            dataElement.innerHTML = roomData["humidity"];
            break;
    }
}

socket.on('update', function(packet) {

    mostRecentData[packet["room"]] = packet["data"];
	if(currentRoom == packet["room"]) {
		update();
	}
})
