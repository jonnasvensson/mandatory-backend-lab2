import React, { useState } from 'react';
import EditIcon from '@material-ui/icons/Edit';

import AddItems from './AddItems'
import PopUp from './PopUp'

export default function RenderItems({ items, postAxios, deleteAxios, listId, itemId, itemTitle }) {
    const [showPopUp, setShowPopUp] = useState(false);
    const [title, setTitle] = useState(null);

    const handleShowPopUp = (title) => {
        setShowPopUp(true);
        setTitle(title);
    }
    
    const mappedItems =
        items &&
        items.map((item) => {
            itemId = item._id;
            if (listId === item.listId) {
                return (
                        <div className="item" key={item._id}  onClick={() => handleShowPopUp(item, itemId._id)} >
                            <p>{item.title}</p>
                            <EditIcon />
                        </div>
                )
            } else {
                return;
            }
        })
        

    return (
        <>
            {mappedItems}
            <AddItems 
                items={items} 
                postAxios={postAxios} 
                listId={listId} />
            {
                showPopUp ? <PopUp 
                                title={title} 
                                items={items} 
                                itemId={itemId} 
                                itemTitle={itemTitle} 
                                deleteAxios={deleteAxios} /> : null
            }
        </>
    )
}

