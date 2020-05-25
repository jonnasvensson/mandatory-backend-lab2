import React, { useState } from 'react';
import AddCircleIcon from '@material-ui/icons/AddCircle';


export default function AddItems({ postItemAxios, listId }) {
    const [inputValue, setInputValue] = useState("");

    const handleChange = (e) => {
        setInputValue(e.target.value)
    }
    const handleSubmit = () => {
        let item = {
            title: inputValue,
            description: "",
            listId: listId,
        }
        postItemAxios(item, listId);
        setInputValue("");
    }

    return (
        <>
            <div className="add_item">
                <input
                    type="text"
                    className="input card"
                    value={inputValue}
                    onChange={handleChange} />
                    <AddCircleIcon className="icon" onClick={handleSubmit} />
            </div>    
        </>
    )
}

