import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';

import RenderItems from './RenderItems'


export default function RenderLists({ 
        lists, 
        items, 
        axiosLists,
        postItemAxios, 
        deleteItemAxios, 
        handleShowPopUp, 
        handleDeleteList, 
        axiosPutItem,
        axiosMoveItem,
        }) 
    {

    const mappedLists = lists.map((list) => {        
        return <div    className="list" 
                        key={list._id}>
                <h4>{list.title}</h4>
            <RenderItems 
                list={list} 
                lists={lists}
                listId={list._id} 
                items={items} 
                axiosLists={axiosLists}
                postItemAxios={postItemAxios} 
                deleteItemAxios={deleteItemAxios} 
                handleShowPopUp={handleShowPopUp}
                axiosPutItem={axiosPutItem}
                axiosMoveItem={axiosMoveItem} />
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