import React, {useEffect, useState} from 'react';
import Item from '../Item/Item';

const axios = require("axios")



const ItemList = () => {
    const [items, setItems] = useState([])



    useEffect(()=>{
        axios.get('http://localhost:3000/inventory')
        .then((response)=>{
            setItems(response.data.items)
        }).catch((err)=>{
            console.log(err)
        })
    },[])

    return (
        <div className='item-list-container'>
            <Item specifications={["Item name", "Item Count", "Warehouse Location", "Last Updated"]}></Item>
            {items.map((item)=>{
                return <Item specifications={[item["item_name"], item["item_count"], item["warehouse"], item["last_updated"]]}></Item>
            })}
        </div>
    );
};

export default ItemList;