var mongoClient = require('mongodb').MongoClient;
const url='mongodb://server:w5ixa6urgKMyf2N@ds113134.mlab.com:13134/linterview_svmc';
var ObjectId = require('mongodb').ObjectID;
var dbmodel= {
    checkAlive: async function(userID){
        if(!ObjectId.isValid(userID)) return Promise.reject("getAlive in mongo.js : userId is not valid !")
        let client = await mongoClient.connect(url,{useNewUrlParser : true});
        let db = client.db('linterview_svmc');
        try {
            //trả về là có sự thay đổi ở danh sách cấm không
            let query = { _id: { $in: [ userID, new ObjectId(userID) ] }} ;
            const res = await db.collection('User').findOne(query);
            // console.log(res.haveUpdated);
            if(res != null)
            return Promise.resolve(res.haveUpdated);
            else return Promise.reject("getBannedWebSite in mongo.js : cant find user");
        } catch (error) {
            return Promise.reject(error);
        } finally {
            client.close();
        }
    },
    getBannedWebSites: async function(userID){
        if(!ObjectId.isValid(userID)) return Promise.reject("getBannedWebSite in mongo.js : userId is not valid !")
        let client = await mongoClient.connect(url,{useNewUrlParser : true});
        let db = client.db('linterview_svmc');
        try {
            let query = { _id: { $in: [ userID, new ObjectId(userID) ] }} ;
            const res = await db.collection('User').findOne(query);
            console.log(res.listBannedWebSite);
            if(res != null){
                let newValue = {$set:{haveUpdated:0}} // đặt lại là không có cập nhập
                await db.collection('User').updateOne(query,newValue);
                return Promise.resolve(res.listBannedWebSite);
            }            
            else return Promise.reject("getBannedWebSite in mongo.js : cant find user");
        } catch (error) {
            return Promise.reject(error);
        } finally {
            client.close();
        }
    },

    addViolation: async function(violation){ //them vi pham
        if(!ObjectId.isValid(violation.userID)) return Promise.reject("addViolation in mongo.js : userId is not valid !")
        let client = await mongoClient.connect(url,{useNewUrlParser : true});
        let db = client.db('linterview_svmc');
        try {
            await db.collection('Violation').insertOne(violation);
            return Promise.resolve("OK");
        } catch (error) {
            return Promise.reject(error);
        } finally {
            client.close();
        }
    },

    addUser: async function(adminID, name){
        if(!ObjectId.isValid(adminID)) return Promise.reject("addUser in mongo.js : adminID is not valid !");
        let client = await mongoClient.connect(url,{useNewUrlParser : true});
        let db = client.db('linterview_svmc');
        try {
            
            let query = { _id: { $in: [ adminID, new ObjectId(adminID) ] }} ;
            let findAdmin = await db.collection('Admin').findOne(query);
            if(findAdmin!= null){
                let new_user = {"name":name,"adminID":adminID,"listBannedWebSite" : [],"haveUpdated" : 0};
                const addNewUser = await db.collection('User').insertOne(new_user);
                return Promise.resolve(addNewUser.insertedId+"");
            }else return Promise.reject("adminNotFound");
            
        } catch (error) {
            return Promise.reject(error);
        } finally {
            client.close();
        }
    },

    getListComputers: async function(adminID){
        if(!ObjectId.isValid(adminID)) return Promise.reject("addUser in mongo.js : adminID is not valid !");
        let client = await mongoClient.connect(url,{useNewUrlParser : true});
        let db = client.db('linterview_svmc');
        try {
            let query = { adminID:adminID} ;
            let Computers = await db.collection('User').find(query).toArray();

            // console.log(addUserToAdmin);
            return Promise.resolve(Computers);
        } catch (error) {
            return Promise.reject(error);
        } finally {
            client.close();
        }
    },

    getOverViewByUser:async function(adminID,fromDate,toDate){
        if(!ObjectId.isValid(adminID)) return Promise.reject("addUser in mongo.js : adminID is not valid !");
        let client = await mongoClient.connect(url,{useNewUrlParser : true});
        let db = client.db('linterview_svmc');
        try {
            let query = { adminID:adminID} ;
            let Computers = await db.collection('User').find(query).toArray();
            for(var i =0 ; i< Computers.length; i++){
                // console.log(Computers[i]._id);
                let query2 = { _id:{ $gte: objectIdWithTimestamp(fromDate),
                                    $lte: objectIdWithTimestamp(toDate) },
                                    userID:Computers[i]._id+""} ;
                let c = await db.collection('Violation').find(query2).toArray();
                Computers[i].sum = c.length;
                delete Computers[i].listBannedWebSite;
                delete Computers[i].haveUpdated;
                delete Computers[i].adminID;
                delete Computers[i]._id;
            };

            // console.log(addUserToAdmin);
            return Promise.resolve(Computers);
        } catch (error) {
            return Promise.reject(error);
        } finally {
            client.close();
        }

    }
}
function objectIdWithTimestamp(timestamp) {
    // Convert string date to Date object (otherwise assume timestamp is a date)
    if (typeof(timestamp) == 'string') {
        timestamp = new Date(timestamp);
    }

    // Convert date object to hex seconds since Unix epoch
    var hexSeconds = Math.floor(timestamp/1000).toString(16);

    // Create an ObjectId with that hex timestamp
    var constructedObjectId = ObjectId(hexSeconds + "0000000000000000");

    return constructedObjectId
}
// dbmodel.getBannedWebSites('5bf4abcae7179a56e213cd2d');
// dbmodel.addUser("5bf3ec04e7179a56e21350f3","May02");
// dbmodel.getListComputers("5bf3ec04e7179a56e21350f3");
// dbmodel.getOverViewByUser("5bf3ec04e7179a56e21350f3","2018-11-20","2018-11-30").then(r=>console.log(r));

module.exports =dbmodel;