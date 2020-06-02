const express = require('express');
const app = express();
const PORT = 8099;

const http = require('http').createServer(app);

app.use((req, res, next) => {
    let start = Date.now();
    res.once('finish', () => {
        console.log(req.method, req.path, res.statusCode, (Date.now() - start) + 'ms');
    });
    next();
});

app.use((req, res, next) => {
    if (req.is('json')) {
        let data = "";
        req.on('data', chunk =>{
            data += chunk.toString();
        });
        req.on('end', () => {
            try {
            data = JSON.parse(data);
            req.body = data;
            next();
            } catch (error)  {
            res.status(400).end();
            }
        })
    } else {
        next();
    }
})

const MONGODB = require('./db')

app.get('/lists', async (req, res) => {
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
    if (!newList.title) {
        res.status(400).end();
        return;
    }
    const data = await MONGODB.postList(newList);
    if (!data) {
        res.status(500).end();
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
     if (!item.title.length) {
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
    if (!upDatedItem.title.length) {
        return res.status(400).end();
    }

    const data = await MONGODB.putItem(itemId, upDatedItem);
    if (!data) {
        res.status(500).end();
        return;
    }
    res.status(200).send(data);
})

app.delete('/lists/:listId', async (req, res) => {
    let listId = req.params.listId;
    const data = await MONGODB.deleteList(listId);
    if (data) {
        const data = await MONGODB.deleteListItem(listId);
    }
    res.status(204).send(data);

})

app.delete('/items/:itemId', async (req, res) => {
    let itemId = req.params.itemId;
    const data = await MONGODB.deleteItem(itemId);
    res.status(204).send(data);
})

http.listen(PORT, () => console.log(`Server started on ${PORT}`));









