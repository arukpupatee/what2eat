var express = require('express');
var app = express();
var ejs = require('ejs');
var mysql = require('mysql'); //pakage for connect MySQL (MariaDB Compatible)
var bodyParser = require('body-parser');
var fs = require('fs');
var http = require('http');
var https = require('https');

//connect to Database
var db = mysql.createConnection({
  	host     : '127.0.0.1', //port 3306 for MariaDB
  	user     : 'root',
	  password : 'arttra88',
    database : 'what2eat',
});

// set the view engine to ejs
app.set('view engine', 'ejs');

// for parsing data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({ extended: true }));

//for SSL Encryption
var privateKey = fs.readFileSync('sslcert/what2eat_key.pem','utf8');
var certificate = fs.readFileSync('sslcert/what2eat_cert.pem','utf8');
var credentials = {key: privateKey,cert: certificate};

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

//open server
httpServer.listen(8080);
httpsServer.listen(8443);
console.log('Server is running at http://localhost:8080 and https://localhost:8443');

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
app.post('/result', function(req, res) {
  var ft = req.body["food_type"];
  var t = req.body["taste"];
  var meat = req.body["meat"];
  var vegetable = req.body["vegetable"];
  var other_ingredients = req.body["other_ingredients"];
  var food_type = [];
  var taste = [];
  var ingredients = []
  if(typeof ft === "undefined"){
  }else if(typeof ft === "string"){
    food_type[food_type.length] = ft;
  }else{
    food_type = ft;
  }
  if(typeof t === "undefined"){
  }else if(typeof t === "string"){
    taste[taste.length] = t;
  }else{
    taste = t;
  }
  if(typeof meat === "undefined"){
  }else if(typeof meat === "string"){
    ingredients[food_type.length] = meat;
  }else{
    for(var i=0 ; i<meat.length ;i++){
      ingredients[ingredients.length] = meat[i];
    }
  }
  if(typeof vegetable === "undefined"){
  }else if(typeof vegetable === "string"){
    ingredients[food_type.length] = vegetable;
  }else{
    for(var i=0 ; i<vegetable.length ;i++){
      ingredients[ingredients.length] = vegetable[i];
    }
  }
  if(typeof other_ingredients === "undefined"){
  }else if(typeof other_ingredients === "string"){
    ingredients[food_type.length] = other_ingredients;
  }else{
    for(var i=0 ; i<other_ingredients.length ;i++){
      ingredients[ingredients.length] = other_ingredients[i];
    }
  }
  var query = "SELECT Food.ID FROM Food ";
  query += "INNER JOIN Taste ON Food.ID = Taste.Food_ID ";
  query += "INNER JOIN Consist_of ON Food.ID = Consist_of.Food_ID ";
  query += "INNER JOIN Ingredients ON Consist_of.Ingredient_ID = Ingredients.ID ";
  query += "INNER JOIN Shops ON Food.Shop_ID = Shops.ID ";
  if( (food_type.length != 0) || (taste.length != 0) || (ingredients.length != 0) ){
    query += "WHERE ";
  }
  if( food_type.length != 0 ){
    query += " (";
  }
  for(var i=0; i<food_type.length ; i++){
    query += " Food.Type = '" + food_type[i] + "'";
    if(i != food_type.length-1){
      query += " OR";
    }
  }
  if( food_type.length != 0 ){
    query += ")";
  }
  if( taste.length != 0 ){
    query += " AND (";
  }
  for(var i=0; i<taste.length ; i++){
    query += " Taste.Taste = '" + taste[i] + "'";
    if(i != taste.length-1){
      query += " OR";
    }
  }
  if( taste.length != 0 ){
    query += ")";
  }
  if( ingredients.length != 0 ){
    query += " AND (";
  }
  for(var i=0; i<ingredients.length ; i++){
    query += " Ingredients.Name = '" + ingredients[i] + "'";
    if(i != ingredients.length-1){
      query += " OR";
    }
  }
  if( ingredients.length != 0 ){
    query += ")";
  }
  db.query(query, function (err, rows, fields) {
    if (err) throw err
    var select_food = [];
    Object.keys(rows).forEach(function(index){
  		select_food[select_food.length] = rows[index]["ID"];
  	});
    var query2 = "SELECT Food.ID , Food.Name as 'Food_Name' , Taste.Taste , Ingredients.Name as 'Ingredients' , Shops.Title as 'Shop' FROM Food ";
    query2 += "INNER JOIN Taste ON Food.ID = Taste.Food_ID ";
    query2 += "INNER JOIN Consist_of ON Food.ID = Consist_of.Food_ID ";
    query2 += "INNER JOIN Ingredients ON Consist_of.Ingredient_ID = Ingredients.ID ";
    query2 += "INNER JOIN Shops ON Food.Shop_ID = Shops.ID ";
    if( (select_food.length != 0) ){
      query2 += "WHERE ";
    }
    for(var i=0; i<select_food.length ; i++){
      query2 += " Food.ID = " + select_food[i];
      if(i != select_food.length-1){
        query2 += " OR";
      }
    }
    query2 += " ORDER BY Food.Name,Food.ID"
    db.query(query2, function (err, rows, fields) {
      if (err) throw err
      var food_data = [];
      Object.keys(rows).forEach(function(index){
        if(food_data.length != 0){
          if(food_data[food_data.length-1]["ID"] == rows[index]["ID"]){
            if( isInArray(food_data[food_data.length-1]["Taste"] , rows[index]["Taste"]) ){
              if(  !(isInArray(food_data[food_data.length-1]["Ingredients"] , rows[index]["Ingredients"])) ){
                food_data[food_data.length-1]["Ingredients"][ food_data[food_data.length-1]["Ingredients"].length ] = rows[index]["Ingredients"];
              }
            }else{
              food_data[food_data.length-1]["Taste"][ food_data[food_data.length-1]["Taste"].length ] = rows[index]["Taste"];
              if( !(isInArray(food_data[food_data.length-1]["Ingredients"] , rows[index]["Ingredients"])) ){
                food_data[food_data.length-1]["Ingredients"][ food_data[food_data.length-1]["Ingredients"].length ] = rows[index]["Ingredients"];
              }
            }
          }else{
            var food = {
              "ID": rows[index]["ID"],
              "Food_Name": rows[index]["Food_Name"],
              "Taste": [ rows[index]["Taste"] ],
              "Ingredients": [ rows[index]["Ingredients"] ],
              "Shop": rows[index]["Shop"],
            };
            food_data[food_data.length] = food;
          }
        }else{
          var food = {
            "ID": rows[index]["ID"],
            "Food_Name": rows[index]["Food_Name"],
            "Taste": [ rows[index]["Taste"] ],
            "Ingredients": [ rows[index]["Ingredients"] ],
            "Shop": rows[index]["Shop"],
          };
          food_data[food_data.length] = food;
        }
    	});
      obj = {"food_data":food_data};
      res.render('pages/result',obj);
    });
  });
});
app.get('/insert', function(req, res) {
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
            db.query("SELECT DISTINCT Title FROM Shops", function (err, rows, fields) {
              if (err) throw err
              var shop = [];
              Object.keys(rows).forEach(function(index){
            		shop[shop.length] = rows[index]["Title"];
              });
              obj["shop_title"] = shop;
              db.query("SELECT DISTINCT Type FROM Shops", function (err, rows, fields) {
                if (err) throw err
                var shop_type = [];
                Object.keys(rows).forEach(function(index){
              		shop_type[shop_type.length] = rows[index]["Type"];
                });
                obj["shop_type"] = shop_type;
                db.query("SELECT DISTINCT Type FROM Ingredients WHERE NOT(Type='เนื้อสัตว์' OR Type='ผัก')", function (err, rows, fields) {
                  if (err) throw err
                  var ingredient_type = [];
                  Object.keys(rows).forEach(function(index){
                		ingredient_type[ingredient_type.length] = rows[index]["Type"];
                  });
                  obj["ingredient_type"] = ingredient_type;

                  //response page
                  res.render('pages/insert',obj);
                });
              });
            });
          });
        });
      });
    });
	});
});
app.post('/insert', function(req, res) {
  var ft = req.body["food_type"];
  var t = req.body["taste"];
  var meat = req.body["meat"];
  var vegetable = req.body["vegetable"];
  var other_ingredients = req.body["other_ingredients"];
  var food_name = req.body["food_name"];
  var food_type = [];
  var taste = [];
  var ingredients = []
  if(typeof ft === "undefined"){
  }else if(typeof ft === "string"){
    food_type[food_type.length] = ft;
  }else{
    food_type = ft;
  }
  if(typeof t === "undefined"){
  }else if(typeof t === "string"){
    taste[taste.length] = t;
  }else{
    taste = t;
  }
  if(typeof meat === "undefined"){
  }else if(typeof meat === "string"){
    ingredients[food_type.length] = meat;
  }else{
    for(var i=0 ; i<meat.length ;i++){
      ingredients[ingredients.length] = meat[i];
    }
  }
  if(typeof vegetable === "undefined"){
  }else if(typeof vegetable === "string"){
    ingredients[food_type.length] = vegetable;
  }else{
    for(var i=0 ; i<vegetable.length ;i++){
      ingredients[ingredients.length] = vegetable[i];
    }
  }
  if(typeof other_ingredients === "undefined"){
  }else if(typeof other_ingredients === "string"){
    ingredients[food_type.length] = other_ingredients;
  }else{
    for(var i=0 ; i<other_ingredients.length ;i++){
      ingredients[ingredients.length] = other_ingredients[i];
    }
  }
  console.log(food_name);
  console.log(food_type);
  console.log(taste);
  console.log(ingredients);
  res.redirect('/insert');
});
app.post('/food/insert/', function(req, res) {
  var return_obj = {};
  res.json(return_obj);
});
app.post('/taste/insert/', function(req, res) {

  var return_obj = {};
  res.json(return_obj);
});
app.post('/ingredients/insert/', function(req, res) {
  var ingredient_name = req.body.ingredient_name;
  var ingredient_type = req.body.ingredient_type;
  var return_obj = {}
  db.query("SELECT Name FROM Ingredients WHERE Name='"+ingredient_name+"' AND Type='"+ingredient_type+"'", function (err, rows, fields) {
    if (err) throw err
    if(rows.length == 0){
      db.query("SELECT ID FROM Ingredients ORDER BY ID DESC LIMIT 1", function (err, rows, fields) {
        if (err) throw err
        var ingredient_id = rows[0]["ID"] + 1;
        db.query("INSERT INTO Ingredients (ID, Name, Type) VALUES ("+ingredient_id+",'"+ingredient_name+"','"+ingredient_type+"')", function (err, rows, fields) {
          if (err) throw err
          return_obj.status = "success";
          res.json(return_obj);
        });
      });
    }
    else{
      return_obj.status = "duplicate";
      res.json(return_obj);
    }
  });
});
app.post('/shop/insert/', function(req, res) {
  var shop_title = req.body.shop_title;
  var shop_type = req.body.shop_type;
  var shop_place = req.body.shop_place;
  var return_obj = {}
  db.query("SELECT Title FROM Shops WHERE Title='"+shop_title+"' AND Type='"+shop_type+"'", function (err, rows, fields) {
    if (err) throw err
    if(rows.length == 0){
      db.query("SELECT ID FROM Shops ORDER BY ID DESC LIMIT 1", function (err, rows, fields) {
        if (err) throw err
        var shop_id = rows[0]["ID"] + 1;
        db.query("INSERT INTO Shops (ID, Title, Type, Place) VALUES ("+shop_id+",'"+shop_title+"','"+shop_type+"','"+shop_place+"')", function (err, rows, fields) {
          if (err) throw err
          return_obj.status = "success";
          res.json(return_obj);
        });
      });
    }
    else{
      return_obj.status = "duplicate";
      res.json(return_obj);
    }
  });
});




function isInArray(arr,value){
  var inArray = false;
  for(var i=0 ; i<arr.length ; i++){
    if(arr[i] == value){
      inArray = true;
    }
  }
  return inArray;
}
