"use strict";

class Sensor {
    constructor(name, password, level, room) {
        this.name = name;
        this.password = password;
        this.level = level;
        this.room = room;

        this.temperature = 0;
        this.humidity = 0;
        this.soundLevel = 0;
        this.lightLevel = 0;
    }

    setName(name) {
        this.name = name;
    }

    getName() {
        return this.name;
    }

    setPassword(password) {
        this.password = password;
    }

    getPassword() {
        return this.password;
    }

    setLevel(level) {
        this.level = level;
    }

    getLevel() {
        return this.level;
    }

    setRoom(room) {
        this.room = room;
    }

    getRoom() {
        return this.room;
    }

    setTemperature(temperature) {
        this.temperature = temperature;
    }

    getTemperature() {
        return this.temperature;
    }

    setHumidity(humidity) {
        this.humidity = humidity;
    }

    getHumidity() {
        return this.humidity;
    }

    setSoundLevel(soundLevel) {
        this.soundLevel = soundLevel;
    }

    getSoundLevel() {
        return this.soundLevel;
    }

    setLightLevel(lightLevel) {
        this.lightLevel = lightLevel;
    }

    getLightLevel() {
        return this.lightLevel;
    }
}

module.exports = {
    "Sensor" : Sensor
}
