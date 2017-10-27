"use strict";

var bcrypt = require("bcrypt");
var env = require("dotenv");
var vsprintf = require("sprintf-js").vsprintf;
var NetworkQueue = require("./networking/network_queue.js").NetworkQueue;
var sensorManager = require("./sensor_manager.js");

var cs; // clientSocket
var sr; // sensorReceiver

var connectedClients = {};
var activeQueues = {};

env.load();


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
            bcrypt.compare(data.password, process.env.SENSOR_PASSWORD_HASH, function(err, res) {
                if (res) { // Correct password
                    console.log(vsprintf('Sensor for %s connected on socket %s', [data.name, socket.id]));
                    registerSensorSocket(socket.id, data);
                    socket.emit("connectionStatus", { status: "accepted" });
                } else { // Incorrect
                    var reason = "Incorrect password";
                    console.log(vsprintf('Sensor connection on %s for room %s rejected. Reason: %s', [socket.id, data.name, reason]));
                    socket.emit("connectionStatus", {
                        status: "rejected",
                        reason: reason
                    });
                    socket.disconnect(true);
                }
            });
        });

        socket.on("disconnect", (reason) => {
            var sensor = sensorManager.getSensor(socket.id);
            if (!!sensor) {
                console.log(vsprintf('Sensor for %s disconnected. Reason: %s', [sensor.room, reason]));
                unregisterSensorSocket(socket.id);
            } else {
                console.log(vsprintf("Sensor disconnected on socket %s. Reason: %s", [socket.id, reason]));
            }
        });

        // Sensor has sent data to the server
        socket.on("receiveSensorInformation", (packet) => {
            // Run a callback given to us when setup function was called
            if (sensorManager.getSensor(socket.id))
                receiveSensorInformation(socket.id, connectedClients, packet);
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
