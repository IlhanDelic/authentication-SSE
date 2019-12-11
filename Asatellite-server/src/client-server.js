"use strict";
exports.__esModule = true;
//const http = require('http');
var express = require("express");
var app = express();
// Declare an EventSource
var Source = require("eventSource");
var source1 = new Source('http://localhost:5000/welcome');
var source2 = new Source('http://localhost:5000/countdown');
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
source2.addEventListener('message', function (e) {
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
