var track_model = require('../Model/adminModel')
function  whoUseThisTrack(req) {
   return id_user;
}
var track_router = {
    setAliveForTrack : function (req, res) {
        var userID = whoUseThisTrack(req);
        
    },    
    addComputer: function (req,res){
        console.log(req.body);
        res.statusCode = 201;
        res.send(JSON.stringify({"good":"bad"}));
    }
}
module.exports = track_router;