import React, { useState } from 'react';
import ReactDOM from "react-dom";
import DeleteIcon from '@material-ui/icons/Delete';


export default function Popup({ 
    item, 
    clickedItem, 
    deleteItemAxios, 
    axiosPutItem,
    axiosMoveItem, 
    itemId, 
    list, 
    lists }) 
    
    {
    const [inputValue, setInputValue] = useState("");    
    const [state, setState] = useState({
        title: clickedItem.title, 
        description: clickedItem.description, 
    })
    const [selectedList, setSelectedList] = useState("");    
    
    console.log('ITEM', item);
    
    console.log('LISTS -->', lists);
    console.log('ITEM ID', itemId);
    console.log('CLICKED ITEM -->', clickedItem);    
    console.log('CLICKED ITEM ID -->', clickedItem._id);    
    
    const handleChange = (e) => {
        
        const value = e.target.value;
        setState({...state, 
            [e.target.name]: value
        })
    }

    const handleDelete = (itemId) => {
        deleteItemAxios(itemId);
    }

    const handleMove = (selectedList, clickedItem) => {
        console.log(selectedList);
        axiosMoveItem(selectedList, clickedItem);
    }
    console.log('SELECTLIST --> ID ', selectedList);

    const handleSave = (itemId) => {
        let upDatedItem = {
            title: state.title,
            description: state.description,
        }
        axiosPutItem(itemId, upDatedItem);
        console.log('ITEM ID', itemId);
    }

    
    return ReactDOM.createPortal ((
            <div className="popUp">
                <input 
                    className="input"
                    type="text" 
                    name="title"
                    value={state.title} 
                    onChange={handleChange}/>
                <div className="container_textfiled">
                    <textarea 
                        className="textfield"
                        type="text" 
                        name="description"
                        onChange={handleChange} 
                        value={state.description} />
                    <button onClick={(e) => handleSave(clickedItem._id)}>Update</button>
                </div>
                <div className="container_textfiled">
                    <select onChange={(e) => setSelectedList(e.target.value)} name="" id="">
                    <option value="none"> </option>
                        { 
                            lists.map((list) => <option key={list._id} value={list._id} >{list.title}</option>)
                        }
                    </select>
                    <button onClick={() => handleMove(selectedList, itemId)}>move item</button>
                </div>
                <div className="bottom_container">
                    <DeleteIcon className="icon" onClick={(e) => handleDelete(clickedItem._id)} />
                    <p>Created: {clickedItem.date}</p>
                </div>
            </div>
        ),
    document.body);
}