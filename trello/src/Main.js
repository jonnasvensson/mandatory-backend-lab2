import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import RenderLists from './RenderLists'

export default function Main() {
    const [lists, setLists] = useState([]);
    const [items, setItems] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [errorMSG, setErrorMSG] = useState(false);

    useEffect(() => {
        axiosLists();
        getItemsFromAxios();
    }, []);

    function axiosLists() {
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

    const handleCreateNewList = (e, newList) => {
        e.preventDefault();
        postListAxios(newList);        
        setInputValue("");
        getItemsFromAxios();
    }

    const handleDeleteList = (listId) => {
        axiosDeleteList(listId);
        axiosLists();
    }
    
    function postListAxios() {
        let newList = {
            title: inputValue,
        }
        if (inputValue.trim().length === 0) {
            setInputValue("");
            setErrorMSG(true);
            return;
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

    function axiosPutItem(itemId, upDatedItem) {
        axios
            .put('/items/' + itemId, upDatedItem)
            .then((res) => {
                console.log('RESPONS', res);
                axiosLists();
                getItemsFromAxios();
            })
            .catch(err => {
                console.error(err);
            })
    }

    function axiosDeleteList(listId) {
        axios
            .delete(`/lists/${listId}`)
            .then((res) => {
                setLists(lists.filter(x => x._id !== listId));
            })
            .catch (err => {
                console.log(err);
            })
    }
    
    function deleteItemAxios(itemId) {
        axios
            .delete(`/items/${itemId}`)
            .then((res) => {
                console.log('RESPONS FROM RES', res);
                setItems(items.filter((x) => {                     
                    return x._id !== itemId;  
                })
                );
            })
            .catch(err => {
                console.error(err);
            })
    }

    return (
        <>
            <header>  
                <div className="container_h4"><h4>Trello</h4></div>
                <div className="container_top">
                    <form action="" onSubmit={handleCreateNewList}>
                    <input 
                        placeholder="new list"
                        className="input"
                        required
                        minLength="1"
                        type="text" 
                        value={inputValue} 
                        onChange={(e) => setInputValue(e.target.value)}/>
                    <button 
                        type="submit"
                        className="button_icon">
                        <AddCircleIcon 
                            className="icon top" /> 
                    </button>
                    </form>
                </div>    
                {
                    errorMSG ? <p className="errorMSG" >Enter name of the list</p> : null     
                }
            </header>
            <RenderLists 
                lists={lists} 
                items={items} 
                axiosLists={axiosLists}
                getItemsFromAxios={getItemsFromAxios}
                axiosPutItem={axiosPutItem} 
                postItemAxios={postItemAxios} 
                handleDeleteList={handleDeleteList} 
                deleteItemAxios={deleteItemAxios} />
        </>
    )
};

