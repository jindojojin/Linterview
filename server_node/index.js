const express = require('express')

var http = require('http');
const app = express()
const port = 3000
var db = require('./mongodb_model/mongo.js')


var control = require("./router/control.js");
control.route(app); // truyền cho control điều khiển

app.listen(port, () => console.log(`Server listening on port ${port}!`))