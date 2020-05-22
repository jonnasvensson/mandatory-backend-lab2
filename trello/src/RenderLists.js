import React from 'react';

import RenderItems from './RenderItems'

export default function RenderLists({ lists, items, postAxios, handleClick }) {
    const mappedLists = lists.map((list, i) => 
        <div className="list" key={i}>Title: {list.title}
            <RenderItems list={list} listId={list._id} items={items} postAxios={postAxios} handleClick={handleClick} />
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