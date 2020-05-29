import React, { useState } from 'react';
import AriaModal from 'react-aria-modal';
import DeleteIcon from '@material-ui/icons/Delete';
import CancelIcon from '@material-ui/icons/Cancel';


export default function Popup({ 
    clickedItem, 
    axiosLists,
    getItemsFromAxios,
    deleteItemAxios, 
    axiosPutItem,
    itemId, 
    lists, 
    deactivateModal,
    handleExit,
    }) 
    
    {
    const [state, setState] = useState({
        id: clickedItem._id,
        title: clickedItem.title, 
        description: clickedItem.description, 
        listId: clickedItem.listId,
    })
    const [selectedList, setSelectedList] = useState("");    
        
    const handleChange = (e) => {
        const value = e.target.value;
        setState({...state, 
            [e.target.name]: value
        })
    }

    const handleDelete = (itemId) => {
        deleteItemAxios(itemId);
        deactivateModal();
        axiosLists();
    }
    
    const handleMove = (selectedList, itemId) => {
        let upDatedItem = {
            title: state.title,
            description: state.description,
            listId: selectedList,  
        }
        axiosPutItem(clickedItem._id, upDatedItem);
        deactivateModal();
        getItemsFromAxios();
    }

    const handleSave = (itemId) => {
        let upDatedItem = {
            title: state.title,
            description: state.description,
            listId: state.listId,  
        }        
        axiosPutItem(itemId, upDatedItem);
    }

    return (
            <AriaModal
                titleText="demo one"
                onExit={deactivateModal}
                initialFocus="#demo-one-deactivate"
                underlayStyle={{ paddingTop: '2em' }}
                className="modal"
            >
            <div className="popup_container">
                <div className="popup_container_section">
                    <input 
                        className="input"
                        type="text" 
                        name="title"
                        value={state.title} 
                        onChange={handleChange}/>
                    <CancelIcon className="cancel" onClick={handleExit} />
                </div>
                <div className="popup_container_section">
                    <textarea 
                        className="textfield"
                        type="text" 
                        name="description"
                        onChange={handleChange} 
                        value={state.description} />
                    <button onClick={(e) => handleSave(clickedItem._id)}>update</button>
                </div>
                <div className="popup_container_section">
                    <select onChange={(e) => setSelectedList(e.target.value)} name="" id="">
                    <option value="none"> </option>
                        { 
                            lists.map((list) => <option key={list._id} value={list._id} >{list.title}</option>)
                        }
                    </select>
                    <button onClick={(e) => handleMove(selectedList, itemId)}>move item</button>
                </div>
                <div className="popup_container_section bottom">
                    <DeleteIcon className="icon" onClick={(e) => handleDelete(clickedItem._id)} />
                    <p>{clickedItem.date}</p>
                </div>
            </div>
            </AriaModal>   
    )
}