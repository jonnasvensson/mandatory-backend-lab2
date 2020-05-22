import React, { useState } from 'react';
import EditIcon from '@material-ui/icons/Edit';

import AddItems from './AddItems'

export default function RenderItems({ items, postAxios, listId, handleClick }) {

    const mappedItems =
        items &&
        items.map((item, i) => {
            if (listId === item.listId) {
                return (
                        <div className="item" key={i} onClick={handleClick}>
                            <p>{item.title}</p>
                            <EditIcon />
                        </div>
                    )
            } else {
                return;
            }
        })

    return (
        <>
            {mappedItems}
            <AddItems items={items} postAxios={postAxios} listId={listId} />
        </>
    )
}

