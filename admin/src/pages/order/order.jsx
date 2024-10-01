import React, {useState} from 'react'
import './order.css'
import {toast } from "react-toastify";
import { useEffect } from 'react';
import { assets } from '../../../../frontend/src/assets/assets';

const order = ({url}) => {

  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async()=>{
    const response   = await fetch(`${url}/api/order/list`,{
      method: "GET",
    });
    const result =  await response.json();
    if(result.success){
      setOrders(result.data);
      
    }else{
      toast.error("Error");
    }
    
  }
  const statusHandler= async (event,orderid)=>{
    const status = event.target.value;

    
    const response = await fetch(`${url}/api/order/status`,{
      method: "POST",
      headers: {
        'Content-Type': 'application/json', // Set the content type to JSON
    },
      body: JSON.stringify({status: status,orderid: orderid})
    });
    const result = await response.json();
    if(result.success){
      await fetchAllOrders();
    }

  }
  useEffect(()=>{
    fetchAllOrders();
  },[])

  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className="order-list">
        {
          orders.map((order,index)=>(
            
            <div key={index} className="order-item">
              <img src={assets.parcel_icon} alt="" />
              <div className="">
                <p className='order-item-food'>
                  {
                  order.items.map((item,index)=>{
                    if(index = order.items.length - 1){
                      
                      return item.name + " x " + item.quantity
                    }
                    else{
                      return item.name + " x " + item.quantity + ", "
                    }
                    
                  })}
                </p>
                <p className='order-item-name'>
                  {order.address.firstName + "" + order.address.lastName}
                </p>
                <div className='order-item-address'>
                    <p>{order.address.street + ", "}</p>
                    <p>{order.address.city + ", " + order.address.state + ", " + order.address.country+", " + order.address.zipcode }</p>
                </div>
                <p className='order-item-phone'>
                  {order.address.phone}
                </p>
              </div>
              <p>Items : {order.items.length}</p>
              <p>${order.amount}</p>
              <select onChange={(event)=>statusHandler(event,order.orderid)} value={order.status}>
                <option value="Food Processing">Food Processing</option>
                <option value="Out For Delivery">Out For Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
            
          ))
        }
      </div>
    </div>
  )
}

export default order
