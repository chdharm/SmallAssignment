var express = require('express');
var app = express();
var mysql = require("mysql");
//Database connection
app.use(function(req, res, next){
	res.locals.connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : ' ',
		database : 'MinanceDB'
	});
	res.locals.connect();
	next();
});

 res.locals.connection.connect(function(err) {
	if (err) {
	  return console.error('error: ' + err.message);
	}
   
	let createTodos = `create table if not exists employees(
							id int primary key auto_increment,
							email varchar(50),
							firstname varchar(20),
							lastname varchar(20)
						)`;
	let device_table=`create table if not exists devices(
							id int primary key auto_increment,
							emp_id int,
							name varchar(255)not null
						)`;
   
	res.locals.connection.query(employee_table, function(err, results, fields) {
	  if (err) {
		console.log(err.message);
	  }else{
		console.log("Employee table created");
	  }
	});
	res.locals.connection.query(device_table, function(err, results, fields) {
		if (err) {
		  console.log(err.message);
		}else{
			console.log("Device table created");
		}
	  });

	res.locals.connection.end(function(err) {
	  if (err) {
		return console.log(err.message);
	  }
	});
  });

//Using all routes
var routes = require('./routes')
app.use('/apis', routes);

var server = app.listen(4200, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("My server is runninbg on host--",host," and port--",port)
})
