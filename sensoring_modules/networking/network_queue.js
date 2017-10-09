"use strict";

class NetworkQueue {
    constructor(socketEvent, queueTime, networkClients) {
        // queue is cleared every time it networks
        this.queue = [];

        // Which event the queue should emit its data on
        this.socketEvent = socketEvent;

        // How long should the queue wait before it sends all its data
        this.queueTime = queueTime;

        // A list of sockets that we will be transmitting data to
        this.networkClients = networkClients

        // A timer object so we can clean up when this NetworkQueue is deleted
        this.timer = undefined;
    }

    startNetworking() {
        this.timer = setTimeout(this.doNetwork, this.queueTime);
    }

    stopNetworking() {
        if (this.timer != undefined)
            clearTimeout(this.timer);
    }

    // Networks the queue and deletes everything inside of it
    doNetwork() {
        for (k in this.networkClients) {
            this.networkClients[k].emit(socketEvent, this.queue);
        }

        this.queue = [];

        this.timer = setTimeout(this.doNetwork, this.queueTime);
    }
}

module.exports = {
    "NetworkQueue" : NetworkQueue
}