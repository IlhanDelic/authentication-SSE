
// TODO
// TODO registration
// TODO login
// TODO token
// TODO authentication
// TODO SSE data stream
// TODO all local in terminal

import express = require("express");
const app = express();
app.set('view-engine', 'ejs');
const readline = require('readline');

const users = [ {id:'1', email:'bob@mail.com', password:'bob', name:'bob', location:'roomA'},
                {id:'2', email:'jay@mail.com', password:'jay', name:'jay', location:'roomB'},
                {id:'3', email:'rik@mail.com', password:'rik', name:'rik', location:'roomC'},
                {id:'4', email:'piet@mail.com', password:'piet', name:'piet', location:'classified'}
                ]; // array to store the users for this test program

//----------------------------------------------------------------------------------makes sure you can work with input
const rl = readline.createInterface({ //rl reads the input from the command lines
    input: process.stdin,
    output: process.stdout
});
//---------------------------------------------------------------------------------------------------------------

rl.question('enter your email: ', (userMail:string) => {
    function findEmail (x:any) {
        return x.email === userMail;
    }
        rl.question('enter your password', (password:string) => {
            function findPw (x:any) {
                return x.email === userMail;

            }
            console.log(users.find(findEmail));
            console.log(users.map(findEmail));
        })
});

app.get('/form', (req, res)=>{

});



