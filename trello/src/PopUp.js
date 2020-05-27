import React, { useState } from 'react';
import AriaModal from 'react-aria-modal';
import DeleteIcon from '@material-ui/icons/Delete';
import CancelIcon from '@material-ui/icons/Cancel';


export default function Popup({ 
    item, 
    clickedItem, 
    axiosLists,
    deleteItemAxios, 
    axiosPutItem,
    axiosMoveItem, 
    itemId, 
    list, 
    lists, 
    deactivateModal,
    handleExit,
    }) 
    
    {
    //const [inputValue, setInputValue] = useState("");    
    const [state, setState] = useState({
        title: clickedItem.title, 
        description: clickedItem.description, 
        listId: clickedItem.listId,
    })
    const [selectedList, setSelectedList] = useState("");    
        
    console.log('LISTS', lists);
    console.log('ITEM ID', itemId);
    console.log('CLICKED ITEM', clickedItem);        
    
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
    
    const handleMove = (selectedList, clickedItem, itemId) => {
        //console.log(selectedList);
        let upDatedItem = {
            title: state.title,
            description: state.description,
            listId: selectedList,   // skicka in listid!
        }

        axiosPutItem(itemId, upDatedItem);
        
    }
    console.log('SELECTLIST --> ID ', selectedList);


    const handleSave = (itemId) => {
        let upDatedItem = {
            title: state.title,
            description: state.description,
            listId: state.listId,   // skicka in listid!
        }
        console.log(upDatedItem.listId);
        
        axiosPutItem(itemId, upDatedItem);
        console.log('ITEM ID', itemId);
        // kalla på axios getlists?
    }

    
    return (
            <AriaModal
                titleText="demo one"
                onExit={deactivateModal}
                initialFocus="#demo-one-deactivate"
                underlayStyle={{ paddingTop: '2em' }}
                className="modal"
            >
            <div className="popUp">
                <CancelIcon className="icon" onClick={handleExit} />
                <input 
                    className="input"
                    type="text" 
                    name="title"
                    value={state.title} 
                    onChange={handleChange}/>
                <div className="container_textfiled">
                    <textarea 
                        className="textfield"
                        type="text" 
                        name="description"
                        onChange={handleChange} 
                        value={state.description} />
                    <button onClick={(e) => handleSave(clickedItem._id)}>update</button>
                </div>
                <div className="container_textfiled">
                    <select onChange={(e) => setSelectedList(e.target.value)} name="" id="">
                    <option value="none"> </option>
                        { 
                            lists.map((list) => <option key={list._id} value={list._id} >{list.title}</option>)
                        }
                    </select>
                    <button onClick={(e) => handleMove(selectedList)}>move item</button>
                </div>
                <div className="bottom_container">
                    <DeleteIcon className="icon" onClick={(e) => handleDelete(clickedItem._id)} />
                    <p>Created: {clickedItem.date}</p>
                </div>
            </div>
            </AriaModal>   
    )
}