
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
const users:any = []; // empty array to store the users for this test program
//----------------------------------------------------------------------------------makes sure you can work with input
const rl = readline.createInterface({ //rl reads the input from the command lines
    input: process.stdin,
    output: process.stdout
});
//---------------------------------------------------------------------------------------------------------------



app.get('/', (req, res) => {  // really important to make sure to put req first and res second because it wont work if res is first
    main();
    res.send('home');
    console.log('home page');
});

app.get('/register', (req, res) => {

   res.send('register');
   console.log('register page');
});

app.get('/login', (req, res) => {
   res.send('login');
   console.log('login page');
});

main();

// ---------------------------------------------------------------------------------makes sure you can work with input
function main() {
    rl.question(`do you want to register as a new user [r] \n` +
        `do you want to log in [l] \n` + `See counter [c] \n\n`, (answer:string) => {
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
                rl.question("do you want to quit? [y/n]", (quit: string) =>{
                switch (quit.toLocaleLowerCase()) {
                    case 'y':
                        return;

                    case 'n':
                        main();
                        break;

                    default:
                        return;  } });
            break;

            case 'c':
                app.get('/countdown', (req, res) =>{

                    res.set({
                        connection: "keep alive",
                        "cache-control": "no-cache",
                        "content-Type": "text/event-stream",
                    });
                    countdown(res, 13)
                });
                break;

            default:
                console.log("you need to choose something");
                    main();
        }
        main()
    });
}
//---------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------ function for registering a user

function register(){

    rl.question('enter your email: ', (email:string) => {
        rl.question('enter your username: ', (username:string) => {
            rl.question('enter your password: ', (password:string) => {
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
    rl.question("enter email: ", (username:string) =>{
        rl.question("enter password: ", (password:string) => {
            //TODO authentication, id/token/userinfo
        });
    });
}
//---------------------------------------------------------------------------------------------------------------
function countdown(res: any, count: number){
    let id = 0;
    res.write(`data: time left ${count} \n\n`);
    if (count){
        setTimeout(() => countdown(res, count-1), 1000);
        id++;
    }
    else {
        res.write(`times up!\n\n\n`);
        res.end();
    }
}

app.listen(3000, () => console.log ('go to localhost:3000'));

