import React, { useState, useEffect } from 'react';
import ReactDOM from "react-dom";
import axios from 'axios';


export default function Popup({ item, title, deleteItemAxios, itemId }) {
    const [inputValue, setInputValue] = useState("");    
    
    const handleChange = (e) => {
        setInputValue(e.target.value);
        console.log(inputValue);   
    }

    const handleDelete = (e, itemId) => {
        console.log('DELETE Clicked');
        console.log(itemId);
        
        deleteItemAxios(itemId);
    }

    const handleSave = (e) => {
        console.log('SAVE Clicked');
    }
    
    return ReactDOM.createPortal ((
            <div className="popUp">
                <h2>{title.title}</h2>                 
                <textarea type="text" onChange={handleChange} value={inputValue} />
                <button onClick={handleSave}>Save</button>
                <div>
                    <p>Created: {title.date}</p>
                </div>
                <div>
                    <button onClick={(e) => handleDelete(e, itemId)}>Delete</button>
                </div>
            </div>
        ),
    document.body);
}