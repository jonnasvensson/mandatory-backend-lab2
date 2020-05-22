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

app.post('/items/:listId', async (req, res) => {
    let listId = req.params.listId;
    
    let date = new Date().toDateString();
    if (!req.body.title === String) {
        return res.status(400).end();
    }
    let item = {
        title: req.body.title,
        description: "",
        date: date,
        listId: listId
    }    
    const data = await MONGODB.postItem(item);
    res.status(200).send(item);
});

http.listen(PORT, () => console.log(`Server started on ${PORT}`));












/* app.get('/items/:listId', async (req, res) => {
    let listId = req.params.id;
    console.log(listId);
    
    const data = await MONGODB.getLists(listId);
    data ? res.status(200).send(listId) : res.status(400).end();
});
 */



 /* 
app.get('/items/:listId', async (req, res) => {
    let listId = req.params.listId;
    const data = await MONGODB.getItem(listId);
    data ? res.status(200).send(listId) : res.status(400).end();

}) */