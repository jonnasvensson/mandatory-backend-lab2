import React from 'react';
import ReactDOM from "react-dom";


export default function Popup() {
    return ReactDOM.createPortal (
        <div className="popup_container">
            <h2>Pop up</h2>
        </div>,
        document.body
    );
}