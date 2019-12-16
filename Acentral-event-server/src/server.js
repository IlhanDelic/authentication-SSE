"use strict";
// TODO
// TODO registration
// TODO login
// TODO token
// TODO authentication
// TODO SSE data stream
// TODO all local in terminal
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app = express();
app.set('view-engine', 'ejs');
var readline = require('readline');
var users = []; // empty array to store the users for this test program
//----------------------------------------------------------------------------------makes sure you can work with input
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
//---------------------------------------------------------------------------------------------------------------
app.get('/', function (req, res) {
    main();
    res.send('home');
    console.log('home page');
});
app.get('/register', function (req, res) {
    res.send('register');
    console.log('register page');
});
app.get('/login', function (req, res) {
    res.send('login');
    console.log('login page');
});
main();
// ---------------------------------------------------------------------------------makes sure you can work with input
function main() {
    rl.question("do you want to register as a new user [r] \n" +
        "do you want to log in [l] \n" + "See counter [c] \n\n", function (answer) {
        switch (answer.toLowerCase()) {
            case 'r':
                console.log("you need to register a new account.");
                //TODO redirect instead of app.get
                register();
                break;
            case 'l':
                console.log("you need too  log in.");
                login();
                break;
            case 'stop':
                rl.question("do you want to quit? [y/n]", function (quit) {
                    switch (quit.toLocaleLowerCase()) {
                        case 'y':
                            return;
                        case 'n':
                            main();
                        default:
                            return;
                    }
                });
            case 'c':
                app.get('/countdown', function (req, res) {
                    res.set({
                        connection: "keep alive",
                        "cache-control": "no-cache",
                        "content-Type": "text/event-stream",
                    });
                    countdown(res, 13);
                });
            default:
                console.log("you need to choose something");
                main();
        }
        main();
    });
}
//---------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------ function for registering a user
function register() {
    rl.question('enter your email: ', function (email) {
        rl.question('enter your username: ', function (username) {
            rl.question('enter your password: ', function (password) {
                users.push({
                    id: Date.now().toString(),
                    email: email,
                    username: username,
                    password: password
                });
                console.log(users);
                main();
            });
        });
    });
}
//---------------------------------------------------------------------------------------------------------------
function login() {
    rl.question("enter email: ", function (username) {
        rl.question("enter password: ", function (password) {
            //TODO authentication, id/token/userinfo
        });
    });
}
//---------------------------------------------------------------------------------------------------------------
function countdown(res, count) {
    var id = 0;
    res.write("data: time left " + count + " \n\n");
    if (count) {
        setTimeout(function () { return countdown(res, count - 1); }, 1000);
        id++;
    }
    else {
        res.write("times up!\n\n\n");
        res.end();
    }
}
app.listen(3000, function () { return console.log('go to localhost:3000'); });
