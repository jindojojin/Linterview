const express = require('express')
var path = require('path')
const app = express()
const port = 3000;
app.get('/download/LinterViewTrack',(req,res)=>res.sendFile(path.resolve('../router/LinterviewTrack.msi')));
app.use((req,res,next)=>{
    // res.header('Access-Control-Allow-Origin','http://localhost:4200');
    res.header('Access-Control-Allow-Origin','https://linterview.github.io');
    res.header('Access-Control-Allow-Headers','Content-Type,X-Requested-With');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    next();
})
cookieParser = require('cookie-parser')
app.use(cookieParser());  // hỗ trợ đọc cookie từ client
var control = require("./router/control.js");
control.route(app); // truyền cho control điều khiển

app.listen(process.env.PORT || port, () => console.log(`Server listening on port ${port}!`))