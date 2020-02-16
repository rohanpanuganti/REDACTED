const express = require('express');
const app = express();

const port = 3000

app.set('view engine', 'ejs');
app.set("views","./views");


app.get('/', (req, res) => {
    res.render('index', {title: "DON'T HACK", user: "Me"})
});

require("firebase/auth");
require("firebase/firestore");

var firebase = require("firebase/app");
const admin = require("firebase-admin");
const functions = require("firebase-functions");


//admin.initializeApp(functions.config().firebase);


var serviceAccount = require(".\\DB\\adminkey.json");



admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://vot3s-da1d7.firebaseio.com"
});

let db = admin.firestore();

let test = db.collection('users').doc("testdoc");
let setTest = test.set({
    first: 'Yeah',
    next: 'Two'
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
