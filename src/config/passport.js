const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Load Employee model
const Employee = require('../models/employee');

module.exports = function(passport) {
    passport.use(
        new LocalStrategy({ usernameField: 'email'}, (email, password, done) => {
            // Match user
            Employee.findOne({ email: email })
                    .then(employee => {
                        if(!employee) {
                            return done(null, false, {message: "That email is not registered"});
                        }
                        
                        // Match password
                        bcrypt.compare(password, employee.password, (err, isMatch) => {
                            if(err) throw err;
                            if(isMatch) {
                                return done(null, employee);
                            } else {
                                return done(null, false, {message: "Password incorect"})
                            }
                        });
                    })
                    .catch(err => console.log(err));
        })          
    );
    passport.serializeUser(function(employee, done){
        done(null, employee.id);
    });

    passport.deserializeUser(function(id, done) {
        Employee.findById(id, function(err, employee) {
            done(err, employee);
        });
    }); 
}