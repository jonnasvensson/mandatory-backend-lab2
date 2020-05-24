import React, { useState, useEffect } from 'react';
import axios from 'axios';

import RenderLists from './RenderLists'

export default function Main() {
    const [lists, setLists] = useState([]);
    const [items, setItems] = useState([]);
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

    const handleCreateNewList = (newList) => {
        postListAxios(newList);        
        setInputValue("");
        getItemsFromAxios();
    }

    const handleDeleteList = (listId) => {
        console.log('Delete clicked');
        axiosDeleteList(listId);
        getListsFromAxios();
    }
    
    function postListAxios() {
        let newList = {
            title: inputValue,
        }
        axios
            .post('lists/', newList)
            .then((res) => {
                console.log(res.data);
                setLists([...lists, newList])
            })
            .catch(err => {
                console.log(err);
            })
    }

    function postItemAxios(item, listId) {                  
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

    function axiosDeleteList(listId) {
        axios
            .delete(`/lists/${listId}`)
            .then((res) => {
                console.log(res.data);
                getListsFromAxios();
            })
            .catch (err => {
                console.log(err);
            })
    }
    
    function deleteItemAxios(itemId) {
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
            <RenderLists lists={lists} items={items} postItemAxios={postItemAxios} handleDeleteList={handleDeleteList} deleteItemAxios={deleteItemAxios} />
            <div style={{ margin: 30}}>
                <input 
                    type="text" 
                    value={inputValue} 
                    onChange={(e) => setInputValue(e.target.value)}/>
                <button onClick={handleCreateNewList}>Add new list</button>
            </div>
        </>
    )
};

