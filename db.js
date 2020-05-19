const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const ObjectId = mongo.ObjectID;

// Connection URL/ var finns databasen, localhost är vår dator och 27027(mongodb defaultport)
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'DB_TRELLO';

// Create new MongoClient
const client = new MongoClient(url, { useUnifiedTopology: true });
client.connect();
let db = client.db(dbName);

async function getLists() {
    try {
        const result = await db
        .collection('lists')
        .find({})
        .toArray();
        return result;
    } catch {
        throw error;
    }
}

async function getList(listId) {
    try {
        const result = await db
        .collection('lists')
        .findOne({_id: ObjectId(listId)})   // listId skall kolla från server
        return result;
    }
    catch {
        throw error;
    }
}

async function getItems() {
    try {
        const result = await db 
        .collection('items')
        .find({})
        .toArray();
        return result;
    } catch {
        throw error;
    }
}

async function getItem(listId) {
    try {
        const result = await db
        .collection('items')
        .find({listId: ObjectId(listId)})
        return result;
    } catch {
        throw error;
    }
}

/* async function postList() {
    try {
        const result = await db
        .collection('lists')
        .insertOne();
        return result;
    } catch {
        throw error;
    }
}
 */
async function postItem(item) { // item kommer från frontend                                                                                                
    try {
        const result = await db
        .collection('items')
        .insertOne(item);
    } catch {
        throw error;
    }
}

async function relations() {
    try {
        const resut = await db 
        .collection('lists')
        .updateOne({_id: ObjectId(itemId)}, {$push: {
            'item': item 
        }})
        return result;
    } catch{
        throw error;
    }
}

module.exports.getLists = getLists;
module.exports.getList = getList;

module.exports.getItems = getItems;
module.exports.getItem = getItem;

module.exports.postItem = postItem;

module.exports.relations = relations;



//module.exports.postList = postList;


    