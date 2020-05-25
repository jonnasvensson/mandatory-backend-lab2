import React, { useState } from 'react';
import EditIcon from '@material-ui/icons/Edit';

import AddItems from './AddItems'
import PopUp from './PopUp'

export default function RenderItems({ items, axiosPatchItem, postItemAxios, deleteItemAxios, listId, itemId, itemTitle }) {
    const [showPopUp, setShowPopUp] = useState(null);
    const [clickedItem, setclickedItem] = useState(null);
    
    const handleShowPopUp = (item, itemId) => {
        console.log(itemId);
        console.log('ITEM', item);
 
        setShowPopUp(itemId);
        setclickedItem(item);
    }
    
    const mappedItems =
        items &&
        items.map((item) => {
            itemId = item._id;
            if (listId === item.listId) {
                return (
                        <div className="item" key={item._id} onClick={() => handleShowPopUp(item, itemId)} >
                            <p>{item.title}</p>
                            <EditIcon className="icon"/>
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
                postItemAxios={postItemAxios} 
                listId={listId} />
            {
                showPopUp ? <PopUp 
                                clickedItem={clickedItem}
                                itemId={itemId} 
                                itemTitle={itemTitle} 
                                axiosPatchItem={axiosPatchItem}
                                deleteItemAxios={deleteItemAxios} /> : null
            }
        </>
    )
}

