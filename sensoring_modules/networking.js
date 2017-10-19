"use strict";
var vsprintf = require("sprintf-js").vsprintf;
var NetworkQueue = require("./networking/network_queue.js").NetworkQueue;
var sensorManager = require("./sensor_manager.js");

var cs; // clientSocket
var sr; // sensorReceiver

var connectedClients = {};
var activeQueues = {};


function networkingSetup(clientSocket, sensorReceiver, receiveSensorInformation, registerSensorSocket, unregisterSensorSocket) {
    cs = clientSocket;
    sr = sensorReceiver;

    cs.on("connection", (socket) => {
        console.log(vsprintf('Client connection on socket %s', socket.id));
        connectedClients[socket.id] = socket;

        socket.on("disconnect", (reason) => {
            console.log(vsprintf('Client disconnection on socket %s', socket.id));
            delete connectedClients[socket.id];
        });
    });

    // A sensor has connected on a socket to the server
    sr.on("connection", (socket) => {
        console.log(vsprintf('Sensor connection on socket %s', socket.id));

        socket.on("initSensor", (data) => {
            console.log(vsprintf('Sensor for %s connected on socket %s', [data.name, socket.id]));
            registerSensorSocket(socket.id, data);
        });

        socket.on("disconnect", (reason) => {
        var room = sensorManager.getSensor(socket.id).name;
            console.log(vsprintf('Sensor for %s disconnected. Reason: %s', [room, reason]));
            unregisterSensorSocket(socket.id);
        });

        // Sensor has sent data to the server
        socket.on("receiveSensorInformation", (data) => {
            // Run a callback given to us when setup function was called
            receiveSensorInformation(socket.id, connectedClients, data);
        });
    });
}

function createNetworkQueue(queueName, socketEvent, queueTime, networkClients) {
}

function removeNetworkQueue() {

}

module.exports = {
    "networkingSetup" : networkingSetup,
    "addToQueue" : () => {}
};
