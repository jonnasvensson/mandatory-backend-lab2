const express = require('express');
const app = express();
const PORT = 8099;

const http = require('http').createServer(app);

app.use(express.json());

const MONGODB = require('./db')

app.get('/lists', async (req, res) => {
    console.log('DB connected');
    const data = await MONGODB.getLists();
    data ? res.status(200).send(data) : res.status(400).end();
});

app.get('/items', async (req, res) => {
    const data = await MONGODB.getItems();
    data ? res.status(200).send(data) : res.status(400).end();
})

app.post('/lists/', async (req, res) => {
   
    if (!req.body.title === String) {
        return res.status(400).end();
    }
    let newList = {
        title: req.body.title,
    }
    
const data = await MONGODB.postList(newList);
    res.status(200).send(newList);
});


app.post('/items/:listId', async (req, res) => {
    let listId = req.params.listId;
    
    let date = new Date().toDateString();
    if (!req.body.title === String) {
        return res.status(400).end();
    }
    let item = {
        title: req.body.title,
        description: req.body.description,
        date: date,
        listId: listId
    }    
    console.log(item);
    
    const data = await MONGODB.postItem(item);
    res.status(200).send(item);
});

app.put('/items/:itemId', async (req, res) => {
    let itemId = req.params.itemId;
    console.log('REQ PARAMS', req.params.itemId);
    console.log('LIST ID', req.body.listId);
    
    let upDatedItem = {
        title: req.body.title,
        description: req.body.description,
        listId: req.body.listId, 
    }
    console.log('UPDATEDITEM', upDatedItem);

    const data = await MONGODB.putItem(itemId, upDatedItem);

    res.status(204).send(data.value);
})

/* // moveItem
app.put('/items/:listId', async (req, res) =>{
    let listId = req.params.listId;

    let item = req.body.item;
    console.log(item);
    

    const data = await MONGODB.moveItem(item, listId); // döpa om till updatedListId?
    res.status(204).send(data);
})
 */
app.delete('/lists/:listId', async (req, res) => {
    let listId = req.params.listId;
    
    const data = await MONGODB.deleteList(listId);
    res.status(204).send(data);
})

app.delete('/items/:itemId', async (req, res) => {
    let itemId = req.params.itemId;
    const data = await MONGODB.deleteItem(itemId);
    res.status(204).send(data);
})

http.listen(PORT, () => console.log(`Server started on ${PORT}`));









