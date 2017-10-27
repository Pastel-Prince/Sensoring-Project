"use strict";

var env = require("dotenv");
var io = require("socket.io-client");
var socket = io.connect("http://localhost:5001");
var Sensor = require("./sensoring_modules/sensor/sensor.js").Sensor;

env.load();

const timeout = 100;

class NetworkSensor extends Sensor {
	constructor(name, password, level, room) {
		super(name, password, level, room);
		this.connectionStatus = "disconnected";

		socket.emit("initSensor", this.initPacket());

		socket.on("connectionStatus", (status) => {
			if (status.status == "accepted") {
				this.connectionStatus = "connected";
			} else {
				console.log("Connection failed! Reason: " + status.reason);
				this.connectionStatus = "failed";
			}
		});

		socket.on("disconnect", (reason) => {
			console.log("Disconnected: " + reason);
		})
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

var currentSensor = new NetworkSensor("1B1", process.env.SENSOR_PASSWORD, 1, "B1");

function updateServer() {

	if (currentSensor.connectionStatus == "connected")
	{
		// Update Object

		currentSensor.setTemperature(Math.round(Math.random() * 50 - 25));
		currentSensor.setHumidity(Math.round(Math.random() * 100));
		currentSensor.setSoundLevel(Math.round(Math.random() * 50 + 50));
		currentSensor.setLightLevel(Math.round(Math.random() * 5 + 5));

		// Networking
		socket.emit("receiveSensorInformation", currentSensor.buildPacket());
	}
	if (currentSensor.connectionStatus != "failed") {
		setTimeout(updateServer, timeout);
	}
}

setTimeout(updateServer, timeout);
