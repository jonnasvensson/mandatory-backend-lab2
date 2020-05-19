import React, { useState, useEffect } from 'react';
import axios from 'axios';

import RenderLists from './RenderLists'

export default function Main() {
    const [lists, setLists] = useState([]);
    const [items, setItems] = useState([]);

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

    return (
        <>
            <RenderLists lists={lists} items={items}/>
        </>
    )
};