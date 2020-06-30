const express = require('express');
const router = express.Router();
const Employee = require('../models/employee');

// get all employees
router.get('/', async  (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (err) { 
        res.status(500).json({ message: err.message });

    }
})

// get one
router.get('/:id', getEmployee, (req, res, next) => {
    res.json(res.employee);
})

// create one
router.post('/', async (req, res) => {
    const employee = new Employee({ 
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        password: req.body.password,
        task: req.body.task,
    }) 

    try {  
        const newEmployee = await employee.save();
        res.status(201).json(newEmployee); 
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
})

// update one
router.patch('/:id', getEmployee, async (req, res) => {
    if (req.body.task != null) {
        res.employee.task = req.body.task;
    }
    try {
        const updateEmployee = await res.employee.save();
        res.json(updateEmployee)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// detele one
router.delete('/:id', getEmployee, async (req, res) => {
    try {
        await res.employee.remove();
        res.json({ message: "deleted employee "})
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

async function getEmployee(req, res, next) {
    let employee;
    try {
        employee = await Employee.findById(req.params.id)
        if (employee == null) {
            return res.status(404).json({ message: "cannot find employee"});
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.employee = employee;
    next();
}

module.exports = router; 