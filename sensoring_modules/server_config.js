"use strict";
var displayPort = 5000;
var receiverPort = 5001;

function setDisplayPort(newPort) {
    displayPort = newPort;
}

function setReceiverPort(newPort) {
    receiverPort = newPort;
}

function getDisplayPort() {
    return displayPort;
}

function getReceiverPort() {
    return receiverPort;
}

module.exports = {
    "setDisplayPort" : setDisplayPort,
    "setReceiverPort" : setReceiverPort,
    "getDisplayPort" : getDisplayPort,
    "getReceiverPort" : getReceiverPort
};