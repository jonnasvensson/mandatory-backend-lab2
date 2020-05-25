import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddCircleIcon from '@material-ui/icons/AddCircle';

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
                setLists([...lists, res.data])
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

    function axiosPatchItem(itemId, upDatedItem) {
        console.log('itemId', itemId);
        axios
            .put('/items/' + itemId, upDatedItem)
            .then((res) => {
                console.log('RESPONS', res);

                // hämta uppdaterade item!
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
                setLists(lists.filter(x => x._id !== listId));
            })
            .catch (err => {
                console.log(err);
            })
    }
    
    function deleteItemAxios(itemId) {
        console.log('ITEM I AXIOS', itemId);

        axios
            .delete(`/items/${itemId}`)
            .then((res) => {
                console.log('RESPONS FROM RES', res);
                setItems(items.filter((x) => {                     
                    return x._id !== itemId;  
                })
                );
                console.log(itemId);
            })
            .catch(err => {
                console.error(err);
            })
    }

    // Vid flytt
    // 1. Post till listan där itemet skall flyttas till
    // 2. delete på item som skall flyttas från listId
    // 

    return (
        <>
            <header>
                <div className="container_top">
                <input 
                    className="input"
                    type="text" 
                    value={inputValue} 
                    onChange={(e) => setInputValue(e.target.value)}/>
                    <AddCircleIcon className="icon top" onClick={handleCreateNewList}/> 
            </div>    

            </header>
            <RenderLists lists={lists} items={items} axiosPatchItem={axiosPatchItem} postItemAxios={postItemAxios} handleDeleteList={handleDeleteList} deleteItemAxios={deleteItemAxios} />
        </>
    )
};

