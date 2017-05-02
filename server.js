var express = require('express');
var app = express();
var ejs = require('ejs');
var mysql = require('mysql'); //pakage for connect MySQL (MariaDB Compatible)

//connect to Database
var db = mysql.createConnection({
  	host     : '127.0.0.1', //port 3306 for MariaDB
  	user     : 'root',
	  password : 'arttra88',
    database : 'what2eat',
});

// set the view engine to ejs
app.set('view engine', 'ejs');
app.get('/', function(req, res) {
  res.render('pages/index');
});
app.get('/find', function(req, res) {
  var obj = {};
  //get food type
  db.query('SELECT DISTINCT Type FROM Food', function (err, rows, fields) {
    if (err) throw err
    var food_type = [];
    Object.keys(rows).forEach(function(index){
  		food_type[food_type.length] = rows[index]["Type"];
  	});
    obj["food_type"] = food_type;
    //get taste
    db.query('SELECT DISTINCT Taste FROM Taste', function (err, rows, fields) {
      if (err) throw err
      var taste = [];
      Object.keys(rows).forEach(function(index){
    		taste[taste.length] = rows[index]["Taste"];
      });
      obj["taste"] = taste;
      //get meat
      db.query("SELECT DISTINCT Name FROM Ingredients WHERE Type='เนื้อสัตว์'", function (err, rows, fields) {
        if (err) throw err
        var meat = [];
        Object.keys(rows).forEach(function(index){
      		meat[meat.length] = rows[index]["Name"];
        });
        obj["meat"] = meat;
        //get vegetable
        db.query("SELECT DISTINCT Name FROM Ingredients WHERE Type='ผัก'", function (err, rows, fields) {
          if (err) throw err
          var vegetable = [];
          Object.keys(rows).forEach(function(index){
        		vegetable[vegetable.length] = rows[index]["Name"];
          });
          obj["vegetable"] = vegetable;
          //get other igredients
          db.query("SELECT DISTINCT Name FROM Ingredients WHERE NOT(Type='เนื้อสัตว์' OR Type='ผัก')", function (err, rows, fields) {
            if (err) throw err
            var other_ingredients = [];
            Object.keys(rows).forEach(function(index){
          		other_ingredients[other_ingredients.length] = rows[index]["Name"];
            });
            obj["other_ingredients"] = other_ingredients;

            //response page
            res.render('pages/find',obj);
          });
        });
      });
    });
	});
});

app.listen(8080);
console.log('Server is running at localhost:8080');
