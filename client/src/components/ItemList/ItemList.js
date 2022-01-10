import React, {useEffect, useState} from 'react';
import Item from '../Item/Item';
import './ItemList.css'

const axios = require("axios")



const ItemList = () => {
    const [items, setItems] = useState([])
    const [serverMessage, setServerMessage] = useState("")


    useEffect(()=>{
        axios.get('http://localhost:3000/inventory')
        .then((response)=>{
            setItems(response.data.items)
        }).catch((err)=>{
            console.log(err)
        })
    },[serverMessage])

    return (
        <div className='item-list-container'>
            <div id="server-message">Server Message: <b>{serverMessage}</b></div>
            <Item buttonVisibility = "hidden" specifications={["Item name", "Item Count", "Warehouse Location", "Last Updated"]}></Item>
            {items.map((item)=>{
                const specs = [item["item_name"], item["item_count"], item["warehouse"], item["last_updated"]]
                return <Item parentSetServerMessage = {setServerMessage} key = {item["item_id"]} itemID = {item["item_id"]} specifications={specs}></Item>
            })}
        </div>
    );
};

export default ItemList;