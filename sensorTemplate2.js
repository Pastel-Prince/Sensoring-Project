"use strict";

var io = require("socket.io-client");
var socket = io.connect("http://localhost:5001");
var Sensor = require("./sensoring_modules/sensor/sensor.js").Sensor;

var timeout = 1000;

class NetworkSensor extends Sensor {
	constructor(name, password, level, room) {
		super(name, password, level, room);
		socket.emit("initSensor", this.initPacket());
	}

	initPacket() {
		return {
			"name": this.name,
			"password" : this.password,
			"level" : this.level,
			"room" : this.room
		};
	}

	buildPacket() {
		return {
			"room": this.name,
			"data": {
				"temperature" : this.temperature,
				"humidity" : this.humidity,
				"soundLevel" : this.soundLevel,
				"lightLevel" : this.lightLevel
			}
		};
	}
}

var currentSensor = new NetworkSensor("2B4", "password", 1, "B1");

function updateServer() {

	// Update Object

	currentSensor.setTemperature(Math.round(Math.random() * 500));
	currentSensor.setHumidity(Math.round(Math.random() * 1000));
	currentSensor.setSoundLevel(Math.round(Math.random() * 500 + 50));
	currentSensor.setLightLevel(Math.round(Math.random() * 50 + 5));

	// Networking
	socket.emit("receiveSensorInformation", currentSensor.buildPacket());
	setTimeout(updateServer, timeout);
}

setTimeout(updateServer, timeout);
