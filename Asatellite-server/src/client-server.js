"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app = express();
var readline = require('readline');
// Declare an EventSource
var Source = require("eventSource");
var sourceCountdown = new Source('http://localhost:3000/countdown');
var sourceHome = new Source('http://localhost:3000/');
var rl = readline.createInterface({
    //rl reads the input from the command lines
    input: process.stdin,
    output: process.stdout
});
//-----------------------------------------------------------------------------------------------------------
getData();
function getData() {
    rl.question("what data do you want to listen to \n" + "countdown [c]\n" + "home [h]\n", function (answer) {
        switch (answer.toLowerCase()) {
            case 'c':
                console.log("you chose countdown: \n");
                getCountdown();
                break;
            case 'h':
                console.log("you chose home: \n");
                getHome();
                break;
            default:
                getData();
                break;
        }
    });
}
//-----------------------------------------------------------------------------------------------------------
function getCountdown() {
    rl.question('do you want to listen to data [y/n] ', function (answer) {
        if (answer.toLocaleLowerCase() === 'y') {
            sourceCountdown.addEventListener('message', function (e) {
                stopCountdown();
                // Do something - event data will be in e.data,
                if (e.lastEventId === 'time left 0') {
                    // This is the end of the stream
                    sourceCountdown.close();
                }
                else {
                    console.log(e.data);
                    // Process message that isn't the end of the stream...
                }
            });
        }
    });
}
function stopCountdown() {
    rl.question("quit data stream [q] \n", function (answer) {
        if (answer.toLowerCase() === 'q') {
            sourceCountdown.close();
            sourceHome.close();
            console.log('you just ended the data stream');
            getData();
        }
    });
}
//-------------------------------------------------------------------------------------------------------------------
function getHome() {
    rl.question('do you want to listen to data [y/n] ', function (answer) {
        if (answer.toLocaleLowerCase() === 'y') {
            sourceCountdown.addEventListener('message', function (e) {
                stopHome();
                // Do something - event data will be in e.data,
                if (e.lastEventId === 'time left 0') {
                    // This is the end of the stream
                    sourceCountdown.close();
                }
                else {
                    console.log(e.data);
                    // Process message that isn't the end of the stream...
                }
            });
        }
    });
}
function stopHome() {
    rl.question("quit data stream [q] \n", function (answer) {
        if (answer.toLowerCase() === 'q') {
            sourceHome.close();
            sourceCountdown.close();
            console.log('you just ended the data stream');
            getData();
        }
    });
}
