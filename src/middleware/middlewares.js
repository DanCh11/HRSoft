const express = require("express");
const route = express();

const employeesInfo = require("../routes/employees");
const homePage = require("../routes/client/home");
const employeesLogin = require("../routes/auth/login");
const employeesRegister = require("../routes/auth/register");
const employeeChat = require("../routes/client/chat/chat");

route.use("/employees", employeesInfo);
route.use("/home", homePage);
route.use("/login", employeesLogin);
route.use("/register", employeesRegister);
route.use("/chat", employeeChat);

module.exports = route;
