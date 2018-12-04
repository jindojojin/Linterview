var mongoClient = require('mongodb').MongoClient;
const url = require('../router/key').mongodb;
var ObjectId = require('mongodb').ObjectID;
var dbmodel = {
    addAdmin: async function(admin) {
        let client = await mongoClient.connect(url, { useNewUrlParser: true });
        let db = client.db('linterview_svmc');
        try {
            let already = await db.collection('Admin').findOne({username:admin.username});
            if (already != null) return Promise.reject("usernameAlreadyInSystem")
            let a =await db.collection('Admin').insertOne(admin);
            return Promise.resolve(a.insertedId);
        } catch (error) {
            return Promise.reject(error);
        } finally {
            client.close();
        }
    },
    getAdmin: async function(username){
        let client = await mongoClient.connect(url, { useNewUrlParser: true });
        let db = client.db('linterview_svmc');
        try {
            let already = await db.collection('Admin').findOne({username:username});
            if (already != null) {
                return Promise.resolve(already);
            }
            return Promise.reject("notFound");
        } catch (error) {
            return Promise.reject(error);
        } finally {
            client.close();
        }
    },
    checkAlive: async function (userID) {
        if (!ObjectId.isValid(userID)) return Promise.reject("getAlive in mongo.js : userId is not valid !")
        let client = await mongoClient.connect(url, { useNewUrlParser: true });
        let db = client.db('linterview_svmc');
        try {




            //trả về là có sự thay đổi ở danh sách cấm không
            let query = { _id: { $in: [userID, new ObjectId(userID)] } };
            const res = await db.collection('User').findOne(query);
            let update = { $set: { lastTime: new Date() }, $inc: { totalCheckIn: 1 } };
            await db.collection('User').updateOne(query, update);
            // console.log(res.haveUpdated);
            if (res != null)
                return Promise.resolve(res.haveUpdated);
            else return Promise.reject("getBannedWebSite in mongo.js : cant find user");
        } catch (error) {
            return Promise.reject(error);
        } finally {
            client.close();
        }
    },
    getBannedWebSites: async function (adminID, userID) {
        if (!ObjectId.isValid(adminID)) return Promise.reject("getBannedWebSite in mongo.js : userId is not valid !")
        if (userID != null && !ObjectId.isValid(userID)) return Promise.reject("getBannedWebSite in mongo.js : userId is not valid !")
        let client = await mongoClient.connect(url, { useNewUrlParser: true });
        let db = client.db('linterview_svmc');
        try {
            let queryA = { _id: { $in: [adminID, new ObjectId(adminID)] } };
            let query = { _id: { $in: [userID, new ObjectId(userID)] } };
            const res = await db.collection('Admin').findOne(queryA);
            console.log(res.listBannedWebSite);
            if (res != null) {
                if (userID != null) {  // thực hiện nếu yêu cầu là của máy tính, không thực hiện nếu là yêu cầu của website
                    let newValue = { $set: { haveUpdated: 0 } } // đặt lại là không có cập nhập
                    await db.collection('User').updateOne(query, newValue);
                }
                return Promise.resolve(res.listBannedWebSite);
            }
            else return Promise.reject("getBannedWebSite in mongo.js : cant find user");
        } catch (error) {
            return Promise.reject(error);
        } finally {
            client.close();
        }
    },

    addViolation: async function (violation) { //them vi pham
        if (!ObjectId.isValid(violation.userID)) return Promise.reject("addViolation in mongo.js : userId is not valid !")
        let client = await mongoClient.connect(url, { useNewUrlParser: true });
        let db = client.db('linterview_svmc');
        try {
            let query = { _id: { $in: [violation.userID, new ObjectId(violation.userID)] } };
            let update = { $inc: { sumViolation: 1 } }
            await db.collection('User').updateOne(query, update); ///// dang thử nghiệm
            await db.collection('Violation').insertOne(violation);
            return Promise.resolve("OK");
        } catch (error) {
            return Promise.reject(error);
        } finally {
            client.close();
        }
    },

    addUser: async function (adminID, name) {
        if (!ObjectId.isValid(adminID)) return Promise.reject("addUser in mongo.js : adminID is not valid !");
        let client = await mongoClient.connect(url, { useNewUrlParser: true });
        let db = client.db('linterview_svmc');
        try {

            let query = { _id: { $in: [adminID, new ObjectId(adminID)] } };
            let findAdmin = await db.collection('Admin').findOne(query);
            if (findAdmin != null) {
                let new_user = { "name": name, "adminID": adminID, "haveUpdated": 1, "sumViolation": 0, "totalCheckIn": 0, "lastTime": "" };
                const addNewUser = await db.collection('User').insertOne(new_user);
                return Promise.resolve(addNewUser.insertedId + "");
            } else return Promise.reject("adminNotFound");

        } catch (error) {
            return Promise.reject(error);
        } finally {
            client.close();
        }
    },

    getListComputers: async function (adminID) {
        if (!ObjectId.isValid(adminID)) return Promise.reject("getListComputers in mongo.js : adminID is not valid !");
        let client = await mongoClient.connect(url, { useNewUrlParser: true });
        let db = client.db('linterview_svmc');
        try {
            let query = { adminID: adminID };
            let Computers = await db.collection('User').find(query).toArray();

            // console.log(addUserToAdmin);
            return Promise.resolve(Computers);
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        } finally {
            client.close();
        }
    },

    getOverViewByUser: async function (adminID, fromDate, toDate) {
        if (!ObjectId.isValid(adminID)) return Promise.reject("getOverViewByUser in mongo.js : adminID is not valid !");
        let client = await mongoClient.connect(url, { useNewUrlParser: true });
        let db = client.db('linterview_svmc');
        try {
            let query = { adminID: adminID };
            let Computers = await db.collection('User').find(query).toArray();
            for (var i = 0; i < Computers.length; i++) {
                // console.log(Computers[i]._id);
                let query2 = {
                    _id: {
                        $gte: objectIdWithTimestamp(fromDate),
                        $lte: objectIdWithTimestamp(toDate)
                    },
                    userID: Computers[i]._id + ""
                };
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

    },
    getOverViewByWebsite: async function (adminID, fromDate, toDate) {
        if (!ObjectId.isValid(adminID)) return Promise.reject("getOverViewByWebsite in mongo.js : adminID is not valid !");
        let client = await mongoClient.connect(url, { useNewUrlParser: true });
        let db = client.db('linterview_svmc');
        try {
            let queryA = { _id: { $in: [adminID, new ObjectId(adminID)] } };
            let query = { adminID: adminID };
            let websites = await db.collection('Admin').findOne(queryA);//lấy danh sách web bị cấm
            let listWeb = websites.listBannedWebSite;
            listWeb.forEach(element => {
                element.sum = 0; // tổng số lần website này bị vi phạm
            });
            console.log(websites.listBannedWebSite);
            let Computers = await db.collection('User').find(query).toArray(); // lấy ra các user do admin quản lý để lấy danh sách vi phạm rồi mới lọc theo web site
            for (var i = 0; i < Computers.length; i++) {
                // console.log(Computers[i]._id);
                let query2 = {
                    _id: {
                        $gte: objectIdWithTimestamp(fromDate),
                        $lte: objectIdWithTimestamp(toDate)
                    },
                    userID: Computers[i]._id + ""
                };
                let c = await db.collection('Violation').find(query2).toArray();
                c.forEach(vio => {
                    listWeb.forEach(web => {
                        if (vio.webSite.name == web.name && vio.webSite.url == web.url) {
                            web.sum++;
                        }
                    });
                });
            };

            // console.log(addUserToAdmin);
            return Promise.resolve(listWeb);
        } catch (error) {
            return Promise.reject(error);
        } finally {
            client.close();
        }
    },
    updateListBannedWebsite: async function (adminID, listWeb) {
        if (!ObjectId.isValid(adminID)) return Promise.reject("updateListBannedWebsite in mongo.js : adminID is not valid !");
        let client = await mongoClient.connect(url, { useNewUrlParser: true });
        let db = client.db('linterview_svmc');
        try {

            let query = { _id: { $in: [adminID, new ObjectId(adminID)] } };
            let findAdmin = await db.collection('Admin').findOne(query);
            if (findAdmin != null) {
                let newValue = { $set: { listBannedWebSite: listWeb } };
                await db.collection('Admin').updateOne(query, newValue);
                newValue = { $set: { haveUpdated: 1 } }
                query = { adminID: adminID }
                await db.collection('User').updateMany(query, newValue);

                return Promise.resolve("OK");
            } else return Promise.reject("adminNotFound");

        } catch (error) {
            return Promise.reject(error);
        } finally {
            client.close();
        }
    },
    getComputerInfo: async function (userID, firstID, number) {
        console.log("uid:" + userID);
        console.log("fid:" + firstID);
        console.log("num:" + number);


        if (!ObjectId.isValid(userID)) return Promise.reject("getComputerInfo in mongo.js : userId is not valid !")
        let client = await mongoClient.connect(url, { useNewUrlParser: true });
        let db = client.db('linterview_svmc');
        try {

            let query = { _id: { $in: [userID, new ObjectId(userID)] } };
            let user = await db.collection('User').findOne(query);
            user.time = new ObjectId(userID).getTimestamp();
            console.log(user);
            if (user != null) {
                let query2;
                if (!ObjectId.isValid(firstID)) query2 = { userID: userID + "" };
                else query2 = { userID: userID + "", _id: { $lt: new ObjectId(firstID) } };
                let vios = await db.collection('Violation').find(query2).sort({ _id: -1 }).limit(parseInt(number)).toArray();
                vios.forEach(element => {
                    element.time = new ObjectId(element._id).getTimestamp();
                });
                return Promise.resolve({ info: user, violation: vios });
            } else return Promise.reject("UserNotFound");

        } catch (error) {
            return Promise.reject(error);
        } finally {
            client.close();
        }
    },
    killTrack: async function(userID){
        if (userID != null && !ObjectId.isValid(userID)) return Promise.reject("getBannedWebSite in mongo.js : userId is not valid !")
        let client = await mongoClient.connect(url, { useNewUrlParser: true });
        let db = client.db('linterview_svmc');
        try {
            let query = { _id: { $in: [userID, new ObjectId(userID)] } };
            let newValue = { $set: { dead : 1 } } // đặt lại là không có cập nhập
            await db.collection('User').updateOne(query,newValue);
            return Promise.resolve("OK");
        } catch (error) {
            return Promise.reject(error);
        } finally {
            client.close();
        }
    }
}
function objectIdWithTimestamp(timestamp) {
    // Convert string date to Date object (otherwise assume timestamp is a date)
    if (typeof (timestamp) == 'string') {
        timestamp = new Date(timestamp);
    }
    // Convert date object to hex seconds since Unix epoch
    var hexSeconds = Math.floor(timestamp / 1000).toString(16);
    // Create an ObjectId with that hex timestamp
    var constructedObjectId = ObjectId(hexSeconds + "0000000000000000");
    return constructedObjectId
}
// dbmodel.getBannedWebSites('5bf4abcae7179a56e213cd2d');
// dbmodel.addUser("5bf3ec04e7179a56e21350f3","May02");
// dbmodel.getListComputers("5bf3ec04e7179a56e21350f3");
// dbmodel.getOverViewByWebsite("5bf3ec04e7179a56e21350f3","2018-11-20","2018-11-30").then(r=>console.log(r));
// dbmodel.getComputerInfo('5bfcd3eb5deae5036cdc284e','5bffca37ceb1cb4724d284ff',20);
// dbmodel.getAdmin("linhtqf").then(r=> console.log(r)).catch(e=>console.log(e));

module.exports = dbmodel;