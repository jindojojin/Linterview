const express = require('express')

const app = express()
const port = 3000
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','http://localhost:4200');
    res.header('Access-Control-Allow-Headers','Content-Type,X-Requested-With');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    next();
})
cookieParser = require('cookie-parser')
app.use(cookieParser());  // hộ trợ đọc cookie từ client
var control = require("./router/control.js");
control.route(app); // truyền cho control điều khiển

app.listen(port, () => console.log(`Server listening on port ${port}!`))