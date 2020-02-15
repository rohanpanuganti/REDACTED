const express = require('express');
const app = express();

const port = 3000

app.set('view engine', 'ejs');
app.set("views","./views");


app.get('/', (req, res) => {
    res.render('index', {title: "DON'T HACK", user: "Me"})
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))