import React, { useState } from 'react';
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import MaterialIcon, {colorPalette} from 'material-icons-react';
import axios from 'axios';

export default function RenderItems({ items, list }) {
    const [inputValue, setinputValue] = useState("");
    const [createItems, setCreateItems] = useState([]);
    const [showPopUp, setShowPopUp] = useState(false);
    
    console.log('LIST -->',list._id);
    
    const handleChange = (e) => {
        setinputValue(e.target.value)        
    }

    const handlePopUp = () => {
        setShowPopUp(true);
    }

    const handleCancelPopUp = () => {
        setShowPopUp(false);
    }

    const handleSubmit = () => {
        let item = {
            title: inputValue,
            description: "",
        }        
        setCreateItems([...createItems, item]);
        postAxios();
        setinputValue("");
    }

    function postAxios() {
        let item = {
            title: inputValue,
            description: "",
            listId: list._id,
        }        
        axios   
            .post('/items/' + list._id, item)   
            .then((res) => {
                console.log(res.data);
                setCreateItems([...createItems, res.data])
            })
            .catch(err => {
                console.error(err);
            })
    }

    const mappedCreatedItems = createItems.map((createItem, i) => {    // Lägg till textinput för description!
        return <li key={i} onClick={handlePopUp}>
                    <Card body className="item">
                        <p>{createItem.title}</p>
                        <MaterialIcon icon="create"/>
                    </Card>
                </li>
    });

    const mappedItems = items.map((item, i) =>{
        return <li key={i} onClick={handlePopUp}>
                    <Card body className="item">
                        {item.title}
                        <MaterialIcon icon="create"/>
                    </Card>
                </li>
    })

    return (
        <>  
            <ul>
                {mappedItems}
                {mappedCreatedItems}
            </ul>
            <input
                type="text"
                value={inputValue}
                onChange={handleChange} />
            <Button onClick={handleSubmit} variant="outline-primary">Lägg till kort</Button>{' '}
        </>
    )
}