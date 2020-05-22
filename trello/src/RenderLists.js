import React, { useState } from 'react';

import RenderItems from './RenderItems'
import Items from './Items'

export default function RenderLists({ lists, items, postAxios, setItems } ) {


    const mappedLists = lists.map((list, i) => {
//        console.log('LIST ID', list);

        return (
    
        <div className="list" key={i}>Title: {list.title}
            <RenderItems list={list} listId={list._id} items={items} postAxios={postAxios} setItems={setItems}/>
        </div>
        )}
        );

    return (
        <>
        <div className="container_list">
            {mappedLists}
        </div>
        </>
    )
}

/*

import React, { useState } from 'react';
import Card from 'react-bootstrap/Card'

import RenderItems from './RenderItems'

export default function RenderLists({ items, lists }) {


    const mappedLists = lists.map((list, i) => {
        return (
            <Card
                key={i}
                style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>
                        <p key={i}>{list.title}</p>
                    </Card.Title>
                    <RenderItems items={items} list={list}/>
                </Card.Body>
            </Card>
        )
    })

    return (
        <>
            {mappedLists}
        </>
    )
} */