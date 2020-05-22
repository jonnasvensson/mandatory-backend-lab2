import React, { useState, useEffect } from 'react';
import axios from 'axios';


export default function Items({ items, setItems, list, postAxios, listId }) {
    const [inputValue, setinputValue] = useState("");

    const handleChange = (e) => {
        setinputValue(e.target.value)
    }
    const handleSubmit = () => {
        
        let item = {
            title: inputValue,
            description: "",
            listId: listId,
        }
        postAxios(item, listId);
        setinputValue("");
    }

    return (
        <>
            <input
                type="text"
                value={inputValue}
                onChange={handleChange} />
            <button onClick={handleSubmit} >Lägg till kort</button>
        </>
    )
}



/*     function postAxios() {
        let item = {
            title: inputValue,
            description: "",
            listId: list._id,
        }
        axios
            .post('/items/' + list._id, item)
            .then((res) => {
                console.log(res.data);
                setItems([...items, res.data])
            })
            .catch(err => {
                console.error(err);
            })
    }
 */

/*
import React, { useState, useEffect } from 'react';
import RenderItems from './RenderItems';
import axios from 'axios';


 export default function Items({ list })  {
    const [items, setItems] = useState([]);

    console.log('LIST -->',list._id);


    useEffect(() => {
        //getListsFromAxios();
        getItemsFromAxios();
    }, []);

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
            <RenderItems items={items} list={list}/>
        </>
    )
} */