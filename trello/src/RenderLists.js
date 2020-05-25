import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';

import RenderItems from './RenderItems'


export default function RenderLists({ 
        lists, 
        items, 
        postItemAxios, 
        deleteItemAxios, 
        handleShowPopUp, 
        handleDeleteList, 
        axiosPatchItem,
        }) 
    {

    const mappedLists = lists.map((list) => {        
        return <div    className="list" 
                key={list._id}>{list.title}
            <RenderItems 
                list={list} 
                listId={list._id} 
                items={items} 
                postItemAxios={postItemAxios} 
                deleteItemAxios={deleteItemAxios} 
                handleShowPopUp={handleShowPopUp}
                axiosPatchItem={axiosPatchItem} />
            <div    className="container_deleteIcon">
                <DeleteIcon className="icon" onClick={() =>handleDeleteList(list._id)} />
            </div>
        </div>
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