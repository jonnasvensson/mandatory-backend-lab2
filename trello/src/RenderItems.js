import React, { useState } from 'react';
import EditIcon from '@material-ui/icons/Edit';

import AddItems from './AddItems'
import PopUp from './PopUp'

export default function RenderItems({ 
    items, 
    axiosPutItem, 
    postItemAxios, 
    deleteItemAxios,
    axiosMoveItem,
    listId, 
    itemId, 
    itemTitle, 
    list, 
    lists }) {
    const [showPopUp, setShowPopUp] = useState(null);
    const [clickedItem, setclickedItem] = useState(null);
    
    const handleShowPopUp = (item, itemId, list) => {
        //console.log(itemId);
        console.log('ITEM', item);
        //console.log('LIST I HANDLESHOWPOPUP', list);
        
 
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
                                list={list}
                                lists={lists}
                                itemId={itemId} 
                                itemTitle={itemTitle} 
                                axiosPutItem={axiosPutItem}
                                deleteItemAxios={deleteItemAxios}
                                axiosMoveItem={axiosMoveItem} /> : null
            }
        </>
    )
}

