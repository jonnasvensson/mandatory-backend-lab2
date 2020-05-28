const express = require('express');
const app = express();
const PORT = 8099;

const http = require('http').createServer(app);

app.use(express.json());

const MONGODB = require('./db')

app.get('/lists', async (req, res) => {
    console.log('DB connected');
    const data = await MONGODB.getLists();
    if (!data) {
        res.status(500).end();
    }
    res.status(200).send(data);
});

app.get('/items', async (req, res) => {
    const data = await MONGODB.getItems();
    if (!data) {
        res.status(500).end();
    }
    res.status(200).send(data);
})

app.post('/lists/', async (req, res) => {   
    let newList = {
        title: req.body.title,
    }
    const data = await MONGODB.postList(newList);
    if (!newList || !data) {
        res.status(400).end();
        return;
    }
    res.status(201).send(newList);
});


app.post('/items/:listId', async (req, res) => {
    let listId = req.params.listId;
    let date = new Date().toDateString();
    let item = {
        title: req.body.title,
        description: req.body.description,
        date: date,
        listId: listId
    }        
    if (!item) {
        return res.status(400).end();
    }
    const data = await MONGODB.postItem(item);
    res.status(201).send(item);
});

app.put('/items/:itemId', async (req, res) => {
    let itemId = req.params.itemId;    
    let upDatedItem = {
        title: req.body.title,
        description: req.body.description,
        listId: req.body.listId, 
    }
    if (!upDatedItem) {
        return res.status(400).end();
    }
    const data = await MONGODB.putItem(itemId, upDatedItem);
    res.status(200).send(data);
})

app.delete('/lists/:listId', async (req, res) => {
    let listId = req.params.listId;
    const data = await MONGODB.deleteList(listId);
    console.log('DATA', data);
    
    console.log(listId);
    
    if (data) {
        
        const data = await MONGODB.deleteListItem(listId);
        console.log('I DATA', data);

//        res.status(204).send(data);

    }
    res.status(204).send(data);
})

app.delete('/items/:itemId', async (req, res) => {
    let itemId = req.params.itemId;
    const data = await MONGODB.deleteItem(itemId);
    res.status(204).send(data);
})

http.listen(PORT, () => console.log(`Server started on ${PORT}`));









