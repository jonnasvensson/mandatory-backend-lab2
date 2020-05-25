import React, { useState } from 'react';
import ReactDOM from "react-dom";
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';


export default function Popup({ item, clickedItem, deleteItemAxios, axiosPatchItem, itemId }) {
    const [inputValue, setInputValue] = useState("");    
    const [state, setState] = useState({
        title: clickedItem.title, 
        description: clickedItem.description, 
    })
    
    console.log(itemId);
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

    const handleSave = (itemId) => {
        let upDatedItem = {
            title: state.title,
            description: state.description,
        }
        axiosPatchItem(itemId, upDatedItem);
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
                <textarea 
                    className="textfield"
                    type="text" 
                    name="description"
                    onChange={handleChange} 
                    value={state.description} />
                    <SaveIcon className="icon" onClick={(e) => handleSave(clickedItem._id)}/>
                <div>
                </div>
                <div>
                    <DeleteIcon className="icon" onClick={(e) => handleDelete(clickedItem._id)} />
                    <p>Created: {clickedItem.date}</p>
                </div>
            </div>
        ),
    document.body);
}