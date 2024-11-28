import React, { useEffect } from 'react'
import './NewCollections.css'
import { useState } from 'react'

import { Item } from '../Item/Item'


export const NewCollections = () => {

   const [new_collections,setNew_collection]=useState([]);

   useEffect(()=>{
      fetch('http://localhost:5000/newcollection')
      .then((response)=>response.json())
      .then((data)=>setNew_collection(data));
      
   },[])
  return (
   <div className="new-collections">
    <h1>NEW COLLECTIONS</h1>
    <hr/>
    <div className="collections">
       <div className="collections">
        {new_collections.map((item,i)=>{
           return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
            })}
       </div>
    </div>
   </div>
  )
}
