const express = require('express')
const jsparser = require('body-parser').json();
var http = require('http');
const app = express()
const port = 3000
var db = require('../server_node/mongo_connection/mongo');

app.get('/iamalive', (req, res) => res.send(JSON.stringify({listBanned: [{name:"nhattao", url:"nhattao.com"},{name:"facebook", url: "facebook.com"}]})));
app.post('/iamsorry',jsparser,(req,res)=>{
    console.log(req.body);
    console.log("hi hi ở trên là body đó");
    res.sendStatus(201);
    res.send();   
    
})
app.listen(port, () => console.log(`Server listening on port ${port}!`))