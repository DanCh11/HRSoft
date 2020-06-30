const express = require('express')
const router = express.Router();
const Employee = require('../../models/employee');
const bcrypt = require('bcrypt');

//register page
router.get('/', (req, res) => res.render('register'))

//register handle
router.post('/', (req, res) => {

    const {name, surname, email, password, password2} = req.body;
    let errors = [];

    //check required fields
    if(!name || !surname || !email || !password || !password2) {
        errors.push({ msg: "Fill in all fields" }); }

    // check password match
    if(password !== password2) {
        errors.push({ msg: "Passwords do not match" }); }

    // check pass length
    if(password.length < 6) {
        errors.push({ msg: "Password must be at least 6 characters" }); }

    if(errors.length > 0) {
        res.render('register', {
           errors,
           name,
           surname,
           email,
           password,
           password2 });
    } else {
        // Validation pass
        Employee.findOne({ email: email })
                .then(employee => {
                    if(employee) {
                    //Employee exists
                        errors.push({ msg: 'Email is already registered'});
                        res.render('register', {
                            errors,
                            name,
                            surname,
                            email,
                            password,
                            password2 });
                    } else {
                        const newEmployee = new Employee({
                            name,
                            surname,
                            email,
                            password });

                        // Hash Password
                        bcrypt.genSalt(10, (err, salt) =>
                            bcrypt.hash(newEmployee.password, salt, (err, hash) => {
                                if(err) throw err;
                                // Set password to hashed
                                newEmployee.password = hash;
                                // Save user
                                newEmployee.save()
                                    .then(employee => {
                                        //req.flash('success_msg', 'You are now registered');
                                        res.redirect('/login'); })
                                           .catch(err => console.log(err));
                        }))
                    }
                });
            }
        });

module.exports = router;

