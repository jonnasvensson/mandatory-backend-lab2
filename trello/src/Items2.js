import React, { useState, useEffect } from 'react';


export default function Items2( {items} ) {

    const mappedItems = items.map((item, i) =>
        <li key={i}>{item.title}</li>
    )
    console.log(items);
    
    console.log(mappedItems);
    

    return <ul>{mappedItems}</ul>
}