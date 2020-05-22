import React, { useState, useEffect } from 'react';
import axios from 'axios';

import RenderLists from './RenderLists'
import PopUp from './PopUp'

export default function Main() {
    const [lists, setLists] = useState([]);
    const [items, setItems] = useState([]);
    const [showPopUp, setShowPopUp] = useState(false);

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

    const handleClick = (e) => {
        console.log('Item clicked');
        setShowPopUp(true);
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

    return (
        <>
            <RenderLists lists={lists} items={items} postAxios={postAxios} handleClick={handleClick} />
            {
                showPopUp ? <PopUp /> : null
            }
        </>
    )
};

