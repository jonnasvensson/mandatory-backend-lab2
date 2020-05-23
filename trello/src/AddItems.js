import React, { useState } from 'react';


export default function AddItems({ postAxios, listId }) {
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

