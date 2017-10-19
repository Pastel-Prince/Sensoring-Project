"use strict";

var sensors = {};

var Sensor = require("./sensor/sensor.js").Sensor;

class ManagedSensor extends Sensor {
    constructor(name, password, level, room) {
        super(name, password, level, room);
    }
}

function registerSensor(socketId, sensorName, sensorPassword, sensorLevel, sensorRoom, sensorTimeout) {
    var newSensor = new ManagedSensor(sensorName, sensorPassword, sensorRoom, sensorLevel, sensorTimeout);

    sensors[socketId] = newSensor;
    // TODO: Create a table in a database if one does not exist for this sensor.

    return newSensor;
}

function unregisterSensor(socketId) {
    delete sensors[socketId];
}

function getSensor(socketId) {
    return sensors[socketId];
}

module.exports = {
    "registerSensor" : registerSensor,
    "unregisterSensor" : unregisterSensor,
    "getSensor" : getSensor
}
