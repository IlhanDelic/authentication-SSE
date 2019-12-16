//const http = require('http');
import express = require('express');
const app = express();
const readline = require('readline');
// Declare an EventSource

const rl = readline.createInterface({ //rl reads the input from the command lines
    input: process.stdin,
    output: process.stdout
});
rl.question('What do you think of Node.js? ', (answer:string) => {
    // TODO: Log the answer in a database
    console.log(`Thank you for your valuable feedback: ${answer}`);

    rl.close();
});
const Source = require("eventSource");
const source1 = new Source('http://localhost:3000/');
const sourceCountdown = new Source('http://localhost:3000/countdown');

// Handler for events without an event type specified
source1.onmessage = (e: any) => {
    if (e.lastEventId === '-1') {
        // This is the end of the stream
        source1.close();
    } else {
        console.log(e.data);
        // Process message that isn't the end of the stream...
    }
};

sourceCountdown.addEventListener('message', (e: any) => {
    // Do something - event data will be in e.data,
    if (e.lastEventId === 'times up!') {
        // This is the end of the stream
        source1.close();
    } else {
        console.log(e.data);
        // Process message that isn't the end of the stream...
    }
})

