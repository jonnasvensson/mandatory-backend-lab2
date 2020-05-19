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
}