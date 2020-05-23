import React, { useState } from 'react';

import RenderItems from './RenderItems'


export default function RenderLists({ lists, items, postAxios, deleteAxios, handleShowPopUp }) {

    const mappedLists = lists.map((list) => 
    <>
        <div    className="list" 
                key={list._id}>Title: {list.title}
            <RenderItems 
                list={list} 
                listId={list._id} 
                items={items} 
                postAxios={postAxios} 
                deleteAxios={deleteAxios} 
                handleShowPopUp={handleShowPopUp} />
        </div>
        </>
    );

    return (
        <>
            <div className="container_lists">
                {mappedLists}                
            </div>
        </>
    )
}