import React from 'react';
import FlipMove from 'react-flip-move';

function UpdateComponent(props){
    const itemsList = props.itemsList;
    const listItems = itemsList.map(item =>
   {
       return <div className="list" key={item.id}>
     <ul>
         <input className="editInput" type="text" id={item.id} value={item.title} onChange={(e)=>{
             props.updateItem(item.id, e.target.value)}}/>
        <span>
       
        <button className="btn fa fa-trash fa-lg" 
        onClick={() => props.deleteItem(item.id)}></button>
        </span>
     </ul>
     
    </div>
    })
    return <div >
        <h5>{listItems}</h5>
    
    </div>;
  }

  export default UpdateComponent;
