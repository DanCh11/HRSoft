const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 25
    },
    surname: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    task: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: Boolean,
});

module.exports = mongoose.model('Employee', employeeSchema);
