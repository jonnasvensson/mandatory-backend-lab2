import React, { useState } from 'react';
import EditIcon from '@material-ui/icons/Edit';

import AddItems from './AddItems'
import PopUp from './PopUp'

export default function RenderItems({ 
    items, 
    axiosLists,
    getItemsFromAxios,
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
    const [clickedItem, setclickedItem] = useState(null);
    
    const handleShowPopUp = (item) => {
        setModalActive(true);
        setclickedItem(item); 
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
                        <div className="item" key={item._id} onClick={() => handleShowPopUp(item)} >
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
            <section className="container_items">
                {mappedItems}
            </section>
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
                                getItemsFromAxios={getItemsFromAxios}
                                axiosPutItem={axiosPutItem}
                                deleteItemAxios={deleteItemAxios}
                                axiosMoveItem={axiosMoveItem} /> : null
                }
        </>
    )
}

