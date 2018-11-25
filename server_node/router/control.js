const jsparser = require('body-parser').json();
var admin_router = require('./admin_router.js');
var track_router = require('./track_router.js')
var jsonParser = require('body-parser').json();  // nhận json từ client


module.exports = {
    route: function (app) {
        app.get('/iamalive/:id', (req, res) => track_router.checkAlive(req,res));
        app.post('/iamsorry',jsparser,(req,res)=>track_router.addViolation(req,res));
        app.post('/signUpTrack',jsonParser,(req,res)=>track_router.addComputer(req,res));
        app.get('/listWebsiteBanned/:id', (req,res)=>track_router.sendListWebSite(req,res));
    }
}