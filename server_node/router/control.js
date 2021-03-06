const jsparser = require('body-parser').json();
var admin_router = require('./admin_router.js');
var track_router = require('./track_router.js')
var jsonParser = require('body-parser').json();  // nhận json từ client


module.exports = {
    route: function (app) {
        app.get('/iamalive/:id', (req, res) => track_router.checkAlive(req,res));
        app.get('/iamdead/:id',(req,res)=>track_router.checkKilled(req,res));
        app.post('/iamsorry',jsparser,(req,res)=>track_router.addViolation(req,res));
        app.post('/signUpTrack',jsonParser,(req,res)=>track_router.addComputer(req,res));
        app.get('/listWebsiteBanned/:idA/:idU', (req,res)=>track_router.sendListWebSite(req,res));
        // app.get('/admin/listComputers',(req,res)=> admin_router.sendListComputer(req,res));//get thanh post
        app.post('/admin/listComputers',jsonParser,(req,res)=> admin_router.sendListComputer(req,res));//get thanh post
        app.post('/admin/overviewByUser',jsonParser,(req,res)=> admin_router.sendOverViewByUser(req,res));
        app.post('/admin/overviewByWebsite',jsonParser,(req,res)=> admin_router.sendOverViewByWebsite(req,res));
        app.post('/admin/listWebSite',jsonParser,(req,res)=> admin_router.sendListWebsite(req,res));//get thanh post
        app.put('/admin/listWebSite',jsonParser,(req,res)=> admin_router.addListWebsite(req,res));
        app.post('/admin/computerInfo/:id/:firstID/:number',jsonParser,(req,res)=> admin_router.sendUserInfo(req,res));
        app.post('/admin/login',jsonParser,(req,res)=>admin_router.login(req,res));
        app.post('/admin/register',jsonParser,(req,res)=>admin_router.register(req,res));
        app.post('/admin/loginGoogle',jsonParser,(req,res)=>admin_router.loginG(req,res));
        app.get('/',(req,res)=>res.send('NOT THING IN HERE!'));
    }
}