import React, { useState } from 'react';
import AddCircleIcon from '@material-ui/icons/AddCircle';


export default function AddItems({ postItemAxios, listId }) {
    const [inputValue, setInputValue] = useState("");
    const [errorMSG, setErrorMSG] = useState(false);

    const handleChange = (e) => {
        setInputValue(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        let item = {
            title: inputValue,
            description: "",
            listId: listId,
        }
        if (inputValue.trim().length === 0) {
            setErrorMSG(true);
            return;
        }
        postItemAxios(item, listId);
        setInputValue("");
        setErrorMSG(false);
    }

    return (
        <>
            <form
                onSubmit={handleSubmit}
                className="container_add_item">
                <input
                    placeholder="add todo"
                    type="text"
                    required
                    minLength="1"
                    className="input card"
                    value={inputValue}
                    onChange={handleChange} />
                {
                    errorMSG ? <p className="errorMSGadd" >Add a todo</p> : null
                }
                <button
                    className="button_icon">
                    <AddCircleIcon className="icon" />
                </button>
            </form>
        </>
    )
}

