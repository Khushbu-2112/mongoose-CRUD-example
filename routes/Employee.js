var express = require('express');
const router = express.Router();

const mongoose = require('mongoose');


const Employee = require('../models/Employee');

var emp = {};

// Get all employees
router.get('/', (req,res)=>{
    Employee.find({}).exec(function (err, employees) {
        if (err) {
          console.log("Error:", err);
        }
        else {
          res.render("../views/employees/index", {employees: employees});
        }
      });
});

// Get single employee by id
router.get('/show/:id', (req,res)=>{
    Employee.findOne({_id: req.params.id}).exec(function (err, employee) {
        if (err) {
          console.log("Error:", err);
        }
        else {
          res.render("../views/employees/show",  {employee: employee});
        }
      });
});

// Create employee
router.get('/create', (req,res)=>{
    res.render('../views/employees/create');
});

// Save employee
router.post('/save', (req,res)=>{
    var employee = new Employee(req.body);
  console.log(req.body);
    employee.save(function(err) {
      if(err) {
        console.log(err);
        res.render("../views/employees/create");
      } else {
        console.log("Successfully created an employee.");
        res.redirect("/employees/show/"+employee._id);
      }
    });
});

// Edit employee
router.get('/edit/:id', (req,res)=>{
    Employee.findOne({_id: req.params.id}).exec(function (err, employee) {
        if (err) {
          console.log("Error:", err);
        }
        else {
          res.render("../views/employees/edit", {employee: employee});
        }
      });
});

// Edit update
router.post('/update/:id', (req,res)=>{
    Employee.findByIdAndUpdate(req.params.id, { $set: { name: req.body.name, address: req.body.address, position: req.body.position, salary: req.body.salary }}, { new: true }, function (err, employee) {
        if (err) {
          console.log(err);
          res.render("../views/employees/edit", {employee: req.body});
        }
        res.redirect("/employees/show/"+employee._id);
      });
});

// Edit update
router.post('/delete/:id', (req,res)=>{
    Employee.remove({_id: req.params.id}, function(err) {
        if(err) {
          console.log(err);
        }
        else {
          console.log("Employee deleted!");
          res.redirect("/employees");
        }
      });    
});

module.exports = router;