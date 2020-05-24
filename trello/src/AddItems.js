import React, { useState } from 'react';


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
            <input
                type="text"
                value={inputValue}
                onChange={handleChange} />
            <button onClick={handleSubmit} >Lägg till kort</button>
        </>
    )
}

