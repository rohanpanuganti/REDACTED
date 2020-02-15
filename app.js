const express = require('express');
const app = express();

const port = 3000

app.set('view engine', 'ejs');
app.set("views","./views");


app.get('/', (req, res) => {
    res.render('index', {title: "DON'T HACK", user: "Me"})
});


var admin = require("firebase-admin");

var serviceAccount = require("path/to/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://vot3s-da1d7.firebaseio.com"
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
