import React, { useState, useEffect } from 'react';
import axios from 'axios';

import RenderLists from './RenderLists'

export default function Main() {
    const [lists, setLists] = useState([]);
    const [items, setItems] = useState([]);
    const [addList, setAddList] = useState(false);
    const [inputValue, setInputValue] = useState("");


    useEffect(() => {
        getListsFromAxios();
        getItemsFromAxios();
    }, []);

    function getListsFromAxios() {
        axios
            .get('/lists')
            .then((res) => {
                console.log(res.data);
                setLists(res.data);
            })
            .catch(err => {
                console.error(err);
            })
    }

    function getItemsFromAxios() {
        axios
            .get('/items')
            .then((res) => {
                console.log('ITEMS-->', res.data);
                setItems(res.data);
            })
            .catch(err => {
                console.error(err);
            })
    }


    const handleCreateNewList = () => {
        postListAxios();        
        setInputValue("");
    }
    
    function postListAxios() {
        let newList = {
            title: inputValue,
        }
        axios
            .post('lists/')
            .then((res) => {
                console.log(res.data);
                setLists([...lists, newList])
            })
            .catch(err => {
                console.log(err);
            })
    }

    function postAxios(item, listId) {                  
            axios
            .post('/items/' + listId, item)
            .then((res) => {
                console.log(res.data);
                setItems([...items, res.data])
            })
            .catch(err => {
                console.error(err);
            })
    }
    
    function deleteAxios(itemId) {
        axios
            .delete(`/items/${itemId}`)
            .then((res) => {
                console.log(res);
                let newItems = items.filter((x) => {
                    console.log(x);
                    
                    return x._id !== itemId;
                });
                setItems(newItems);
                console.log(itemId);

            })
            .catch(err => {
                console.error(err);
            })
    }
    return (
        <>
            <RenderLists addList={addList} lists={lists} items={items} postAxios={postAxios} deleteAxios={deleteAxios} />
            <div style={{ margin: 30}}>
                <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>
                <button onClick={handleCreateNewList}>Add new list</button>
            </div>
        </>
    )
};

