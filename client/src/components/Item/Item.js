import React, {useEffect, useState} from 'react';
import './Item.css'

const Item = (props) => {
    const [specifications, setSpecifications] = useState([])

    useEffect(() => {
        setSpecifications(props.specifications)
    }, [props.specifications])
    return (
        <div className='specifications-container'>
            {specifications.map((spec)=>{
                return <div className='specification'>{spec}</div>
            })}
        </div>
    );
};

export default Item;