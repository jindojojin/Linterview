var mongoClient = require('mongodb').MongoClient;
mongoClient.connect('mongodb://127.0.0.1:27017', function (err, db) {
    //neu ket noi khong thanh cong thi in ra loi
    if (err) {console.log("server db tắt hoặc không thể kết nối"); return;}
    //neu thanh cong thi log ra thong bao
    console.log('Ket noi thanh cong');
    var dbo = db.db("APP1");
    dbo.collection("Account").findOne({}, function(err, result) {
        if (err) throw err;
        console.log(result);
        // db.close();
    });
    db.close();
    console.log('close thanh cong');
});
var db= {
    find: function(){
        dbo.collection("Account").findOne({}, function(err, result) {
            if (err) throw err;
            console.log(result);
            // db.close();
        });
    }
};
module.exports =db;