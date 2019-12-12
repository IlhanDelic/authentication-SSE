
// TODO
// TODO registration
// TODO login
// TODO token
// TODO authentication
// TODO SSE data stream
// TODO all local in terminal

import express = require("express");
const app = express();

const readline = require('readline');
const users:any  = []; // empty array to store the users for this test program

//----------------------------------------------------------------------------------makes sure you can work with input
const rl = readline.createInterface({ //rl reads the input from the command lines
    input: process.stdin,
    output: process.stdout
});
//---------------------------------------------------------------------------------------------------------------

app.get('/', (req, res) => {
    main();
    res.send('Hello World');
});

app.get('/register', (req, res) => {
   register();
   res.send('you need a new account');
});

app.get('/login', (req, res) => {
   login();
   res.send('login to your account');
});


// ---------------------------------------------------------------------------------makes sure you can work with input
function main() {
    rl.question('are you a new user? [y/n]', (answer:string) => {
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
function register(){
    rl.question('enter your email: ', (email:string) => {
        if (email != "@" ){
        }
        rl.question('enter your username: ', (username:string) => {
            rl.question('enter your password: ', (password:string) => {
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
    rl.question("enter email: ", (username:string) =>{
        rl.question("enter password: ", (password:string) => {
        users.find(username, password)
            //TODO authentication, id/token/userinfo
        });
    });
}
//---------------------------------------------------------------------------------------------------------------

app.listen(3000);

