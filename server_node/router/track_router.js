var admin_model = require('../Model/adminModel')
var db = require('../mongodb_model/mongo')
function  whoUseThisTrack(req) {
   return id_user;
}
var track_router = {
    setAliveForTrack : function (req, res) {
        var userID = whoUseThisTrack(req);
        
    },    
    addComputer: function (req,res){
        console.log(req.body);
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
        console.log(req.body);
        db.addViolation(req.body).then(r=>{
            res.statusCode = 201;
            res.send(r);
        }).catch(e =>{
            console.log(e);
            res.statusCode = 401;
            res.send();
        })
    }
}
module.exports = track_router;