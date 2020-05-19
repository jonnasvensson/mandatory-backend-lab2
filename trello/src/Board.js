import React, { useState, useReducer } from 'react';
import Card from 'react-bootstrap/Card'


export default function Board() {
    const [inputValue, setInputValue] = useState([
        { first: "" ,
         second: "" }
    ]);
    const [lists, setLists] = useState([]);


    const handleSubmit = (e, list) => {
        console.log('Button clicked');
        setLists([...lists, inputValue]);   
        setInputValue("");
    }


    const handleChange = (e) => {
        const name = e.target.name;
        const newValue = e.target.value;
        setInputValue({[name]: newValue });
    }

    const listsArray = lists.map((list, i) => {
        console.log(lists);
        console.log(list.second);
        
        console.log(inputValue);        
        
        return (
            <Card key={i} >
                <Card.Body>
                    <p>{list.second}</p>
                    <input
                        type="text"
                        name="second"
                        onChange={handleChange}
                        value={inputValue.second} />
                    <button onClick={handleSubmit}>Lägg till lista</button>
                </Card.Body>
            </Card>
        )
    })
    console.log(lists);

    return (
        <>
            <Card>
                <Card.Body>
                    <input
                        type="text"
                        name="first"
                        onChange={handleChange}
                        value={inputValue.first} />
                    <button onClick={handleSubmit}>Lägg till lista</button>
                </Card.Body>
            </Card>
            {listsArray}
        </>
    )
}