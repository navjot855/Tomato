import React, { useEffect,useState } from 'react';
import './list.css'

import { toast } from 'react-toastify';

const list = ({url}) => {
  const [List,setList] = useState([]);

  const  fetchList = async()=>{
  const response = await fetch(`${url}/api/food/listFood`,{method: "GET"});
  const result =  await response.json();
  if(result.success){
    console.log(result.data);
    setList(result.data);

  }else{
    toast.error("Error")
  }}
  
  const removeFood =  async(foodId,image)=>{
    console.log(foodId)
    const response = await fetch(`${url}/api/food/removeFood`,{
      method: "DELETE",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        id: foodId,
        image: image
      })
    });
    await fetchList();
    const result = await response.json();
    if(result.success){
      toast.success(result.message);
    }else{
      toast.error("Error");
    }
  }
  useEffect(()=>{
    fetchList()
  },[])

  return (
    <div className='list flex-col'>
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Images</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {
          List.map((item,index)=>{
            return (
              <div key={index} className="list-table-format">
                <img src={`${url}/images/` + item.image} alt="" />
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>{item.price}</p>
                <p  onClick={()=>removeFood(item.id,item.image)} className="cursor">X</p>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default list
