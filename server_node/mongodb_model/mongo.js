var mongoClient = require('mongodb').MongoClient;
const url='mongodb://server:w5ixa6urgKMyf2N@ds113134.mlab.com:13134/linterview_svmc';
var ObjectId = require('mongodb').ObjectID;
var dbmodel= {
    getBannedWebSites: async function(userID){
        if(!ObjectId.isValid(userID)) return Promise.reject("getBannedWebSite in mongo.js : userId is not valid !")
        let client = await mongoClient.connect(url,{useNewUrlParser : true});
        let db = client.db('linterview_svmc');
        try {
            let query = { _id: { $in: [ userID, new ObjectId(userID) ] }} ;
            const res = await db.collection('User').findOne(query);
            console.log(res.listBannedWebSite);
            if(res != null)
            return Promise.resolve(res.listBannedWebSite);
            else return Promise.reject("getBannedWebSite in mongo.js : cant find user");
        } catch (error) {
            return Promise.reject(error);
        } finally {
            client.close();
        }
    },

    addViolation: async function(userID,website){ //them vi pham
        let client = await mongoClient.connect(url,{useNewUrlParser : true});
        let db = client.db('linterview_svmc');
        try {
            let query = {_id:{$oid : userID}}
            const res = await db.collection('User').findOne({});
            console.log(res.listWEB);
            return Promise.resolve(res);
        } catch (error) {
            return Promise.reject(error);
        } finally {
            client.close();
        }
    },

    addUser: async function(addminID, name){
        if(!ObjectId.isValid(addminID)) return Promise.reject("getBannedWebSite in mongo.js : addminID is not valid !")
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
            return Promise.resolve("OK");
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