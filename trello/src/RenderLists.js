import React, { useState } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';

import RenderItems from './RenderItems'


export default function RenderLists({ 
        lists, 
        items, 
        postItemAxios, 
        deleteItemAxios, 
        handleShowPopUp, 
        handleDeleteList }) 
    
    {

    const mappedLists = lists.map((list) => 
        <div    className="list" 
                key={list._id}>Title: {list.title}
            <RenderItems 
                list={list} 
                listId={list._id} 
                items={items} 
                postItemAxios={postItemAxios} 
                deleteItemAxios={deleteItemAxios} 
                handleShowPopUp={handleShowPopUp} />
            <div    className="container_deleteIcon">
                        <DeleteIcon onClick={() =>handleDeleteList(list._id)} />
            </div>
        </div>
    );
    

    return (
        <>
            <div className="container_lists">
                {mappedLists}                
            </div>
        </>
    )
}