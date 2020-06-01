import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';

import RenderItems from './RenderItems'


export default function RenderLists({ 
        lists, 
        items, 
        axiosLists,
        getItemsFromAxios,
        postItemAxios, 
        deleteItemAxios, 
        handleShowPopUp, 
        handleDeleteList, 
        axiosPutItem,
        axiosMoveItem,
        }) 
    {

    const mappedLists = lists.map((list) => {        
        return (
                <div    
                    className="list_container" 
                    key={list._id}>
                    <h4>{list.title}</h4>
                    <RenderItems 
                        list={list} 
                        lists={lists}
                        listId={list._id} 
                        items={items} 
                        axiosLists={axiosLists}
                        getItemsFromAxios={getItemsFromAxios}
                        postItemAxios={postItemAxios} 
                        deleteItemAxios={deleteItemAxios} 
                        handleShowPopUp={handleShowPopUp}
                        axiosPutItem={axiosPutItem}
                        axiosMoveItem={axiosMoveItem} />
                    <div    
                        className="container_deleteIcon">
                        <button
                            className="button_icon"
                            onClick={() =>handleDeleteList(list._id)}>
                            <DeleteIcon className="icon"  />
                        </button>
                    </div>
                </div>
                )
        }
    );
    

    return (
        <>
            <div className="container_lists">
                {mappedLists}                
            </div>
        </>
    )
}