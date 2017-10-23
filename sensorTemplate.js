"use strict";

var io = require("socket.io-client");
var socket = io.connect("http://localhost:5001");
var Sensor = require("./sensoring_modules/sensor/sensor.js").Sensor;

var timeout = 1000;

class NetworkSensor extends Sensor {
    constructor(name, password, level, room) {
        super(name, password, level, room);
    }

    init() {
        return {
            "name": this.name,
            "password" : this.password,
            "level" : this.level,
            "room" : this.room
        }
    }

    buildPacket() {
        return {
            "temperature" : this.temperature,
            "humidity" : this.humidity,
            "pressure" : this.pressure,
            "soundLevel" : this.soundLevel,
            "lightLevel" : this.lightLevel
        }
    }
}

var currentSensor = new NetworkSensor("1B1", "password", 1, "B1");

function updateServer() {

    // Update Object

    currentSensor.setTemperature(Math.round(Math.random() * 50 - 25));
    currentSensor.setHumidity(Math.round(Math.random() * 100));
    currentSensor.setPressure(Math.round(Math.random() * 100000));
    currentSensor.setSoundLevel(Math.round(Math.random() * 50 + 50));
    currentSensor.setLightLevel(Math.round(Math.random() * 5 + 5));

    // Networking
    socket.emit("receiveSensorInformation", currentSensor.buildPacket(), currentSensor.init());
    setTimeout(updateServer, timeout);
}

setTimeout(updateServer, timeout);
