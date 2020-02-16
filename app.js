const express = require('express');
const app = express();

const port = 3000

app.set('view engine', 'ejs');
app.set("views","./views");


app.get('/', (req, res) => {
    res.render('index', {title: "DON'T HACK", user: "Me"})
});


var firebase = require("firebase/app");
var admin = require("firebase-admin");
require("firebase/auth");
require("firebase/firestore");

var serviceAccount = require(".\\DB\\adminkey.json");



admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://vot3s-da1d7.firebaseio.com"
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
