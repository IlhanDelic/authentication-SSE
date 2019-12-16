import express = require('express');
const app = express();
const readline = require('readline');
// Declare an EventSource
const Source = require("eventSource");
const sourceCountdown = new Source('http://localhost:3000/countdown');
const sourceHome = new Source('http://localhost:3000/');


const rl = readline.createInterface({

//rl reads the input from the command lines
    input: process.stdin,
    output: process.stdout
});
//-----------------------------------------------------------------------------------------------------------
getData();

function getData() {
    rl.question(`what data do you want to listen to \n` + `countdown [c]\n` + `home [h]\n`, (answer:string) => {
        switch (answer.toLowerCase()) {

            case 'c':
                console.log(`you chose countdown: \n`)
                getCountdown();
            break;

            case 'h':
                console.log(`you chose home: \n`)
                getHome();
            break;
            default:
                getData();
                break;
    }
    })
}




//-----------------------------------------------------------------------------------------------------------
function getCountdown() {
    rl.question('do you want to listen to data [y/n] ', (answer: string) => {

        if (answer.toLocaleLowerCase() === 'y') {

            sourceCountdown.addEventListener('message', (e: any) => {
                stopCountdown();
                // Do something - event data will be in e.data,
                if (e.lastEventId === 'time left 0') {
                    // This is the end of the stream
                    sourceCountdown.close();

                } else {
                    console.log(e.data);
                    // Process message that isn't the end of the stream...
                }
            });
        }
    });
}

function stopCountdown() {
    rl.question(`quit data stream [q] \n`, (answer: string) => {
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
    rl.question('do you want to listen to data [y/n] ', (answer: string) => {

        if (answer.toLocaleLowerCase() === 'y') {

            sourceCountdown.addEventListener('message', (e: any) => {
                stopHome();
                // Do something - event data will be in e.data,
                if (e.lastEventId === 'time left 0') {
                    // This is the end of the stream
                    sourceCountdown.close();

                } else {
                    console.log(e.data);
                    // Process message that isn't the end of the stream...
                }
            });
        }
    });
}
function stopHome(){
    rl.question(`quit data stream [q] \n`, (answer: string) => {
        if (answer.toLowerCase() === 'q') {
            sourceHome.close();
            sourceCountdown.close();
            console.log('you just ended the data stream');
            getData();
        }
    });
}
