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
            console.log(res.haveUpdated);
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

    addUser: async function(addminID, name){
        if(!ObjectId.isValid(addminID)) return Promise.reject("addUser in mongo.js : addminID is not valid !")
        let client = await mongoClient.connect(url,{useNewUrlParser : true});
        let db = client.db('linterview_svmc');
        try {
            let new_user = {"name":name};
            const addNewUser = await db.collection('User').insertOne(new_user);
            let query = { _id: { $in: [ addminID, new ObjectId(addminID) ] }} ;
            let findAddmin = await db.collection('Admin').findOne(query);
            findAddmin.listUsersID.push(addNewUser.insertedId+"");
            let newValue = {$set:{listUsersID:findAddmin.listUsersID}};
            let addUserToAddmin = await db.collection('Admin').updateOne(query,newValue);

            console.log(addUserToAddmin);
            return Promise.resolve(addNewUser.insertedId+"");
        } catch (error) {
            return Promise.reject(error);
        } finally {
            client.close();
        }
    }
}
// dbmodel.getBannedWebSites('5bf4abcae7179a56e213cd2d');
// dbmodel.addUser("5bf3ec04e7179a56e21350f3","May02");

module.exports =dbmodel;