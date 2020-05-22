import React from 'react';
import ReactDOM from "react-dom";


export default function Popup() {
    return ReactDOM.createPortal ((
            <div className="popUp">
                <h2>Pop up</h2>
            </div>
        ),
    document.body);
}