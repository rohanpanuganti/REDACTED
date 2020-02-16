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
  res.render('index', {title: "DON'T HACK", user: "Me"})
});

io.on('connection', function(socket){
  socket.on('chat', function(msg){
    db.collection('Chat').doc().set({
      name: "Rohan",
      text: msg
    });
    socket.emit('chat', msg);
    
    
  });
});

//just add
const testFolder = './images/';
const fs = require('fs');

// put images in array
var myfile;
var filenames = [];
var i = 0;

fs.readdir(testFolder, (err, files) => {
    files.forEach(file => {
    filenames.push(file);
    console.log(filenames[i]);
    i++;
    });
})

http.listen(port, () => console.log(`Example app listening on port ${port}!`))
