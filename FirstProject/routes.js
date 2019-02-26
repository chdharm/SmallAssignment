var express = require('express')
var router = express.Router()

router.get('/getAllEmployees/',function (req, res) {
	res.locals.connection.query('SELECT * from employees', function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
    res.locals.connection.end(function(err) {
        if (err) {
          return console.log(err.message);
        }
      });
});
router.get('/getEmployeeDetials/:employee_id',function (req, res) {
	res.locals.connection.query('SELECT * from employees where employeeId='+employee_id, function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
    res.locals.connection.end(function(err) {
        if (err) {
          return console.log(err.message);
        }
      });
});
router.post('/addEmployee', function (req, res) {
    res.locals.connection.query('insert into employees(email,firstname,lastname) values('+req.body.email+','+req.body.firstname+','+req.body.secondname+')', function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
    res.locals.connection.end(function(err) {
        if (err) {
          return console.log(err.message);
        }
      });
});
router.post('/addEmployeeDeviceDetails', function (req, res){
    res.locals.connection.query('insert into devices(emp_id,device_name) values('+req.body.emp_id+','+req.body.device_name+')', function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
    res.locals.connection.end(function(err) {
        if (err) {
          return console.log(err.message);
        }
      });
});
router.patch('/addEmployeeAdditionalDetail', function (req, res){
    //We can provide alter and puth some data whihc was previously empty
});
router.delete('/deleteEmployee', function (req, res){
    res.locals.connection.query('delete * from employees where id='+req.body.emp_id, function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
    res.locals.connection.end(function(err) {
        if (err) {
          return console.log(err.message);
        }
      });
});
router.delete('/deleteEmployeeDeviceDetails', function (req, res){
    res.locals.connection.query('SELECT * from devices where emp_id='+req.body.emp_id+' and id='+req.body.device_id, function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
    res.locals.connection.end(function(err) {
        if (err) {
          return console.log(err.message);
        }
      });
});

module.exports = router;
