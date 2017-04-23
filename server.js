var express = require('express');
var app = express();
var ejs = require('ejs');

// set the view engine to ejs
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.render('pages/index');
});
app.get('/find', function(req, res) {
    res.render('pages/find');
});

app.listen(8080);
console.log('Server is running');
