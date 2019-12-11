
// TODO
// TODO registration
// TODO login
// TODO token
// TODO authentication
// TODO SSE data stream
// TODO all local in terminal
import express = require('express');
const app = express();
const readline = require('readline');
const users = []; // empty array to store the users for this test program

//----------------------------------------------------------------------------------makes sure you can work with input
const rl = readline.createInterface({ //rl reads the input from the command lines
    input: process.stdin,
    output: process.stdout
});
//---------------------------------------------------------------------------------------------------------------


main();



//----------------------------------------------------------------------------------makes sure you can work with input
function main() {
    rl.question('are you a new user? [y/n]', (answer) => {
        switch (answer.toLowerCase()) {
            case 'y':
                console.log("you need to register a new account.");
                register();
                break;
            case 'n':
                console.log("you need too  log in.");
                login();
                break;
            default:
                console.log("you need to choose [y/n]");
                main()


        }
    });
}
//---------------------------------------------------------------------------------------------------------------


//------------------------------------------------------------------------------ function for registering a user
function register(){
    rl.question('enter your email: ', (email) => {
        if (email != "@" ){

        }
        rl.question('enter your username: ', (username) => {
            rl.question('enter your password: ', (password) => {
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


//----------------------------------------------------------------------------------------------------login function
function login() {
    rl.question("enter email: ", (username) =>{
        rl.question("enter password: ", (password) => {
        users.find(username, password)
            //TODO authentication, id/token/userinfo
            app.get('/' , (req, res) => {
                res.set({
                    connection: "keep alive",
                    "cache-control": "no-cache",
                    "content-Type": "text/event-stream",
                });
                res.write(`hello there\n\n`);
            });
        });
    });

}
//---------------------------------------------------------------------------------------------------------------

app.listen(3000);
