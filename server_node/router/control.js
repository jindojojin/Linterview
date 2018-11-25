const jsparser = require('body-parser').json();
var admin_router = require('./admin_router.js');
var track_router = require('./track_router.js')
var jsonParser = require('body-parser').json();  // nhận json từ client


module.exports = {
    route: function (app) {
        app.get('/iamalive', (req, res) => res.send(JSON.stringify({listBanned: [{name:"nhattao", url:"nhattao.com"},{name:"facebook", url: "facebook.com"}]})));
        app.post('/iamsorry',jsparser,(req,res)=>{
            console.log(req.body);
            console.log("hi hi ở trên là body đó");
            res.sendStatus(201);
            res.send();   
            
        });
        app.post('/signUpTrack',jsonParser,(req,res)=>track_router.addComputer(req,res));
    }
}