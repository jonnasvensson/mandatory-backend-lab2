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
        if (inputValue.trim().length === 0) {
            setInputValue("");
            return;
        }
        postItemAxios(item, listId);
        setInputValue("");
    }

    return (
        <>
            <section className="container_add_item">
                <input
                    placeholder="add todo"
                    type="text"
                    className="input card"
                    value={inputValue}
                    onChange={handleChange} />
                    <AddCircleIcon className="icon" onClick={handleSubmit} />
            </section>    
        </>
    )
}

