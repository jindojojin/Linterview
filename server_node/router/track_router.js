var admin_model = require('../Model/adminModel')
var db = require('../mongodb_model/mongo')
var track_router = {
   
    addComputer: function (req,res){
        // console.log(req.body);
        db.addUser(req.body.adminCode,req.body.computerName).then(id=>{
            res.statusCode = 201;
            res.send(id);
        }).catch(e =>{
            console.log(e);
            res.statusCode = 401;
            res.send();
        })

    },
    addViolation: function (req,res){
        // console.log(req.body);
        db.addViolation(req.body).then(r=>{
            res.statusCode = 201;
            res.send(r);
        }).catch(e =>{
            console.log(e);
            res.statusCode = 401;
            res.send();
        })
    },
    checkAlive: function(req,res){
        db.checkAlive(req.params.id).then( r =>{
            res.statusCode = 200;
            res.send(r+"");
        }).catch(e =>{
            console.log(e);
            res.statusCode = 401;
            res.send();
        })
    },
    sendListWebSite: function(req,res){
        // console.log(req.params.id);
        db.getBannedWebSites(req.params.idA,req.params.idU).then(r=>{
            res.statusCode = 200;
            let list={};
            list.listBanned=r;
            res.send(list);
        }).catch(e =>{
            console.log(e);
            res.statusCode = 401;
            res.send();
        })
    }
}
module.exports = track_router;