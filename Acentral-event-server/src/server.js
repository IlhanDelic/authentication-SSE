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
    res.send('Hello World');
});
app.get('/register', function (req, res) {
    register();
    res.send('you need a new account');
});
app.get('/login', function (req, res) {
    login();
    res.send('login to your account');
});
// ---------------------------------------------------------------------------------makes sure you can work with input
function main() {
    rl.question('are you a new user? [y/n]', function (answer) {
        switch (answer.toLowerCase()) {
            case 'y':
                console.log("you need to register a new account.");
                //TODO redirect instead of app.get
                register();
                break;
            case 'n':
                console.log("you need too  log in.");
                login();
                break;
            default:
                console.log("you need to choose [y/n]");
                main();
        }
    });
}
//---------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------ function for registering a user
function register() {
    rl.question('enter your email: ', function (email) {
        if (email != "@") {
        }
        rl.question('enter your username: ', function (username) {
            rl.question('enter your password: ', function (password) {
                users.push({
                    id: Date.now().toString(),
                    email: email,
                    username: username,
                    password: password
                });
                console.log(users);
            });
        });
    });
}
//---------------------------------------------------------------------------------------------------------------
function login() {
    rl.question("enter email: ", function (username) {
        rl.question("enter password: ", function (password) {
            users.find(username, password);
            //TODO authentication, id/token/userinfo
        });
    });
}
//---------------------------------------------------------------------------------------------------------------
app.listen(3000);
