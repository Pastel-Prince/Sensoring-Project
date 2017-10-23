"use strict";

var express = require("express");
var socket = require("socket.io");
var vsprintf = require("sprintf-js").vsprintf;

var networking = require("./sensoring_modules/networking.js");
var serverConfig = require("./sensoring_modules/server_config.js");
var sensorManager = require("./sensoring_modules/sensor_manager.js");

// Configuration
serverConfig.setDisplayPort(5000);
serverConfig.setReceiverPort(5001);

// App setup
var app = express();

var server = app.listen(serverConfig.getDisplayPort(), function(){
  console.log(vsprintf('Server started on port %s', serverConfig.getDisplayPort()));
});

var receiver = app.listen(serverConfig.getReceiverPort(), function(){
  console.log(vsprintf('Listening on port %s for sensor updates', serverConfig.getReceiverPort()));
})

// Static files
app.use(express.static('public'))

// Socket setup
var clientSocket = socket(server);
var sensorReceiver = socket(receiver);

/* Callbacks */
function registerSensorSocket(socketId, data) {
  var sensorTimeout = 10000; // in ms

  // sensorName, sensorPassword, sensorLevel, sensorRoom, sensorTimeout, socketId
  sensorManager.registerSensor(socketId, data.name, data.password, data.level, data.room, sensorTimeout);
}

function unregisterSensorSocket(socketId) {
  sensorManager.unregisterSensor(socketId)
}

// A callback that gets called when a sensor updates the server with some of its information
function receiveSensorInformation(socketId, connectedClients, data, sensorInfo) {
    for (var clientID in connectedClients) {
        connectedClients[clientID].emit("update", data, sensorInfo);
    }
}

// Setup the networking module
networking.networkingSetup(clientSocket, sensorReceiver, receiveSensorInformation, registerSensorSocket, unregisterSensorSocket);
