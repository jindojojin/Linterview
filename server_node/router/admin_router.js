var admin_model = require('../Model/adminModel')
var db = require('../mongodb_model/mongo')
function isAdmin(req) {
   
}
var admin_router = {
    sendListComputer: function(req,res){
        db.getListComputers(req.params.id).then(r=>{
            console.log("sadfadàd");
            res.statusCode= 200;
            res.send(JSON.stringify(r));
        }).catch(e=>{
            res.statusCode = 401;
            res.send();
        })
    },

    sendOverViewByUser: function(req,res){
        console.log(req.body);
            db.getOverViewByUser(req.cookies.userID,req.body.fromDate,req.body.toDate).then(r=>{
                console.log("Đã xử lý yêu cầu xem thống kê theo các máy");
                res.statusCode= 200;
                console.log(r);
                res.send(JSON.stringify(r));
            }).catch(e=>{
                res.statusCode = 401;
                res.send();
            })

        
    }
}
module.exports = admin_router;