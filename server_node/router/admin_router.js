var db = require('../mongodb_model/mongo')
const secure = require('./secure')
var verifier = require('google-id-token-verifier');
var clientId = require('./key').google.clientID;
function isAdmin(req) {

}
var admin_router = {
    loginG: function(req,res){
        console.log(req.body);
        verifier.verify(req.body.t, clientId, function (err, tokenInfo) {
            if (!err) {
                // use tokenInfo in here.
                console.log(tokenInfo);
                //kiểm tra đã tồn tại hay chưa
                db.getAdmin(tokenInfo.email).then(r=>{
                    console.log("admin đã tồn tại");
                        let x = secure.createUserToken({u:r.username,n:r.name});
                        res.statusCode=200;
                        res.send(JSON.stringify({userID:r._id,tk:x,name:r.name}));
                }).catch(e=>{ // admin chưa tồn tại
                    let newAdmin = {
                        name: tokenInfo.name,
                        listBannedWebSite: [],
                        username: tokenInfo.email,
                        dark: tokenInfo.sub,
                    };
                    db.addAdmin(newAdmin).then(r => {
                        let x = secure.createUserToken({u:tokenInfo.email,n:tokenInfo.name});
                        res.statusCode=200;
                        res.send(JSON.stringify({userID:r,tk:x,name:tokenInfo.name}));
                    }).catch(e => {
                        console.log(e);
                        res.statusCode = 401;
                        res.send();
                    })
                });
                
            }else{
                res.statusCode=401;
                res.send();
            }
        });
    },
    register: function (req, res) {
        console.log(req.body)
        if(req.body.username == null || req.body.password == null || req.body.name==null) {res.statusCode=402;res.send();return;}
        try {
            let salt2 = secure.createSalt();
            console.log(salt2);
            let newAdmin = {
                name: req.body.name,
                listBannedWebSite: [],
                username: req.body.username,
                dark: salt2,
                password: secure.encrypt(req.body.password, salt2)                
            };
            db.addAdmin(newAdmin).then(r => {
                console.log(r);
                res.statusCode = 201;
                res.send("OK");
            }).catch(e => {
                console.log(e);
                res.statusCode = 401;
                res.send();
            })
        } catch (error) {
            console.log(error);
            res.statusCode = 401;
            res.send();
        }
    },
    login:function(req,res){
        try {
            console.log(req.body)
            db.getAdmin(req.body.username).then(r=>{
                console.log(r);
                if(secure.compare(req.body.password,r.password,r.dark)){
                    let x = secure.createUserToken({u:r.username,n:r.name});
                    res.statusCode=200;
                    res.send(JSON.stringify({userID:r._id,tk:x,name:r.name}));
                }
            }).catch(e=>{
                console.log(e);
                res.statusCode = 401;
                res.send();
            });
        } catch (error) {
            console.log(error);
            res.statusCode = 401;
            res.send();
        }
    },
    sendListComputer: function (req, res) {
        db.getListComputers(req.cookies.userID).then(r => {
            console.log("Đã gửi danh sách nhân viên");
            res.statusCode = 200;
            res.send(JSON.stringify(r));
        }).catch(e => {
            res.statusCode = 401;
            res.send();
        })
    },

    sendOverViewByUser: function (req, res) {
        console.log(req.body);
        db.getOverViewByUser(req.cookies.userID, req.body.fromDate, req.body.toDate).then(r => {
            console.log("Đã xử lý yêu cầu xem thống kê theo các máy");
            res.statusCode = 200;
            console.log(r);
            res.send(JSON.stringify(r));
        }).catch(e => {
            res.statusCode = 401;
            res.send();
        })


    },

    sendOverViewByWebsite: function (req, res) {
        // console.log(req.body);
        db.getOverViewByWebsite(req.cookies.userID, req.body.fromDate, req.body.toDate).then(r => {
            console.log("Đã xử lý yêu cầu xem thống kê theo website");
            res.statusCode = 200;
            console.log(r);
            res.send(JSON.stringify(r));
        }).catch(e => {
            res.statusCode = 401;
            res.send();
        })


    },
    sendListWebsite: function (req, res) {
        // console.log(req.body);
        db.getBannedWebSites(req.cookies.userID, null).then(r => {
            console.log("Đã xử lý yêu cầu xem website");
            res.statusCode = 200;
            console.log(r);
            res.send(JSON.stringify(r));
        }).catch(e => {
            res.statusCode = 401;
            res.send();
        })


    },
    addListWebsite: function (req, res) {
        console.log(req.body);
        db.updateListBannedWebsite(req.cookies.userID, req.body.list).then(r => {
            console.log("Đã xử lý yêu cầu update website");
            res.statusCode = 201;
            console.log(r);
            res.send(JSON.stringify(r));
        }).catch(e => {
            res.statusCode = 401;
            res.send();
        })
    },

    sendUserInfo: function (req, res) {
        console.log(req.body);
        db.getComputerInfo(req.params.id, req.params.firstID, req.params.number).then(r => {
            console.log("Đã xử lý yêu cầu xem info computer");
            res.statusCode = 200;
            console.log(r);
            res.send(JSON.stringify(r));
        }).catch(e => {
            res.statusCode = 401;
            res.send();
        })
    },
    googleHandler(req,res){
        console.log(req);
        console.log(req.body)
    }

}
module.exports = admin_router;