var express = require('express');
var app = express();
var ejs = require('ejs');
var mysql = require('mysql'); //pakage for connect MySQL (MariaDB Compatible)

//connect to Database
var connection = mysql.createConnection({
  	host     : '127.0.0.1', //port 3306 for MariaDB
  	user     : 'root',
	  password : 'arttra88',
});

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
