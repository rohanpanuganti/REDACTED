const express = require('express');
const app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

const port = 3000

app.set('view engine', 'ejs');
app.set("views","./views");



require("firebase/auth");
require("firebase/firestore");

var firebase = require("firebase/app");
const admin = require("firebase-admin");
const functions = require("firebase-functions");

var firebaseConfig = {
  apiKey: "AIzaSyAvNOiJDNjBcp5Eeu2By7yLAMF40In3ja8",
  authDomain: "vot3s-da1d7.firebaseapp.com",
  databaseURL: "https://vot3s-da1d7.firebaseio.com",
  projectId: "vot3s-da1d7",
  storageBucket: "vot3s-da1d7.appspot.com",
  messagingSenderId: "549966422568",
  appId: "1:549966422568:web:4a512169c7346e5c3b8b1d"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var serviceAccount = require('./DB/adminkey.json');



admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://vot3s-da1d7.firebaseio.com"
});

let db = admin.firestore();
/*
let test = db.collection('users').doc("testdoc");
let setTest = test.set({
    first: 'test',
    next: 'test1'
});
*/


app.get('/', (req, res) => {
  res.render('index', {title: "REDACTED", user: ""})
});

io.on('connection', function(socket){
  socket.on('chat', function(msg){
    db.collection('Chat').doc().set({
      text: msg
    });
       msg = msg.replace("hello", "REDACTED");
      io.emit('chat', msg);
  });

  socket.on('redacted', function(word){
    db.collection('Redacted').doc(word);
  });
});


//add user

function addRedact(redacted) {
    let change = db.collection('Redacted').doc(redacted);
    let setTest = change.set({
        first: 'test'
    });
}
//

//check if user exists

function isRedacted(word) {
    var wordRef = db.collection('Redacted').doc(word);
    var retVal = false;
    wordRef.get().then(function (doc) {
        if (doc.exists) {
            retVal = true;
        }
    })
    return retVal;
}

function redact(msg) {
    //Split our string into words
    var words = msg.toString().split(" ");

    //Check if it's a redact command
    if(words[0].toLowerCase() == 'redacted'){
        addRedact(words[1]);
        return;
    }

    //Loop through each word
    for (var i = 0; i < words.length - 1; i++) {
        var wordRef = db.collection('Redacted').doc(words[i]);

        //
        wordRef.get().then(function (doc) {
            if (doc.exists) {

                console.log(words.length);
                console.log(words[1]);

                console.log(words[i]);
                console.log(msg);

                msg = msg.replace(words[i], 'REDACTED');
                
                
                console.log(msg);
                console.log(i);
                console.log(words.length);
                if (i == words.length - 1) {
                    console.log(msg);
                    io.emit('chat', msg);
                }
            }
        })

    }
};

http.listen(port, () => console.log(`Example app listening on port ${port}!`))
