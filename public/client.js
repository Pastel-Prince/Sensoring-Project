// Make connection
var socket = io.connect('http://localhost:5000');

// Query DOM
var dataElement = document.getElementById('dataView');

// Sets default room to 1b1
var currentRoom = '1B1';
// And the default element to temperature
var currentData = 'Temperature';

// When you click a room it sets the room to the currently viewed room and updates the display
$('.room').click(function() {
    currentRoom = $(this).attr('id');
    update();
});

// Update display when data element is changed
$('.material-icons').click(function(){
    currentData = $(this).attr('id');
    update();
})

var mostRecentData = {};

// Update the value displayed for the currently selects room/element
function update() {
    roomData = mostRecentData[currentRoom];
    if (!!roomData) {
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
    } else {

    }
}

socket.on('update', function(packet) {
    var room = packet["room"];
    mostRecentData[room] = packet["data"];
	if(currentRoom == room) {
		update();
	}
    // Display the room as active. escapeSelector is neccessary to escape any "&".
    // Sensors are assumed to be permenantly active until a page refresh.
    $('#' + $.escapeSelector(room)).addClass("active");
})
