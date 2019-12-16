"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//const http = require('http');
var express = require("express");
var app = express();
var readline = require('readline');
// Declare an EventSource
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
rl.question('What do you think of Node.js? ', function (answer) {
    // TODO: Log the answer in a database
    console.log("Thank you for your valuable feedback: " + answer);
    rl.close();
});
var Source = require("eventSource");
var source1 = new Source('http://localhost:3000/');
var sourceCountdown = new Source('http://localhost:3000/countdown');
// Handler for events without an event type specified
source1.onmessage = function (e) {
    if (e.lastEventId === '-1') {
        // This is the end of the stream
        source1.close();
    }
    else {
        console.log(e.data);
        // Process message that isn't the end of the stream...
    }
};
sourceCountdown.addEventListener('message', function (e) {
    // Do something - event data will be in e.data,
    if (e.lastEventId === 'times up!') {
        // This is the end of the stream
        source1.close();
    }
    else {
        console.log(e.data);
        // Process message that isn't the end of the stream...
    }
});
