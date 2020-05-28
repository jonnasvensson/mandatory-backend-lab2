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

async function getItems(listId) {
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

async function postList(newList) {
    try {
        const result = await db 
        .collection('lists')
        .insertOne(newList);
        return result;
    } catch {
        throw error;
    }
}

async function postItem(item) {    
    item.listId = ObjectId(item.listId)                                                                                           
    try {
        const result = await db
        .collection('items')
        .insertOne(item);
    } catch {
        throw error;
    }
}

async function putItem(itemId, upDatedItem) {
    try {
        const result = await db
        .collection('items')
        .findOneAndUpdate({_id: ObjectId(itemId)}, { $set: upDatedItem })
    } catch (error) {
        console.log(error);
        throw error;   
    }
}

async function deleteList(listId) {
    try {
        const result = await db
        .collection('lists')
        .deleteOne({_id: ObjectId(listId)})
        return data;    //return data gör att jag kan deleta alla items!
    } catch (error){
        console.log(error);
        return error;
    }
}

async function deleteListItem(listId) {
    try {
        const result = await db
        .collection('items')
        .deleteMany({listId: ObjectId(listId)})
        return data;
    } catch (error) {
        console.log(error);
        
        return error;
    }
}

async function deleteItem(itemId) {
    try {
        const result = await db
        .collection('items')
        .deleteOne({_id: ObjectId(itemId)})
        return result;
    } catch {
        throw error;
    }
}


module.exports.getLists = getLists
module.exports.getItems = getItems;
module.exports.postItem = postItem;
module.exports.postList = postList;
module.exports.putItem = putItem;
module.exports.deleteList = deleteList;
module.exports.deleteListItem = deleteListItem;
module.exports.deleteItem = deleteItem;




    