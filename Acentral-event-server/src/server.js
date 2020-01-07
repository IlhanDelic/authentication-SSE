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
var users = [{ id: '1', email: 'bob@mail.com', password: 'bob', name: 'bob', location: 'roomA' },
    { id: '2', email: 'jay@mail.com', password: 'jay', name: 'jay', location: 'roomB' },
    { id: '3', email: 'rik@mail.com', password: 'rik', name: 'rik', location: 'roomC' },
    { id: '4', email: 'piet@mail.com', password: 'piet', name: 'piet', location: 'classified' }
]; // array to store the users for this test program
//----------------------------------------------------------------------------------makes sure you can work with input
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
//---------------------------------------------------------------------------------------------------------------
rl.question('enter your email: ', function (userMail) {
    function findEmail(x) {
        return x.email === userMail;
    }
    console.log(users.find(findEmail));
});
//let data = users.filter(t=>t.email===x);
//console.log(data);
