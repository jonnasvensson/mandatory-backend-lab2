import React, { useState } from 'react';
import EditIcon from '@material-ui/icons/Edit';

import AddItems from './AddItems'
import PopUp from './PopUp'

export default function RenderItems({ 
    items, 
    axiosLists,
    axiosPutItem, 
    postItemAxios, 
    deleteItemAxios,
    axiosMoveItem,
    listId, 
    itemId, 
    itemTitle, 
    list, 
    lists }) {
    
    const [modalActive, setModalActive] = useState(false)
//    const [showPopUp, setShowPopUp] = useState(null);
    const [clickedItem, setclickedItem] = useState(null);
    
    const handleShowPopUp = (item, itemId, list) => {
        //console.log(itemId);
        console.log('ITEM', item);
        //console.log('LIST I HANDLESHOWPOPUP', list);
        
        setModalActive(true);
        //setShowPopUp(itemId);
        setclickedItem(item, itemId);   //skicka med itemId här? för att kunna plocka bort setShowpopUp?
    }

    const deactivateModal = () => {
        setModalActive(false);
    }
    
    const handleExit = () => {
        deactivateModal();
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
                modalActive ? <PopUp 
                                deactivateModal={deactivateModal}
                                handleExit={handleExit}
                                clickedItem={clickedItem}
                                list={list}
                                lists={lists}
                                itemId={itemId} 
                                itemTitle={itemTitle} 
                                axiosLists={axiosLists}
                                axiosPutItem={axiosPutItem}
                                deleteItemAxios={deleteItemAxios}
                                axiosMoveItem={axiosMoveItem} /> : null
                }
        </>
    )
}

