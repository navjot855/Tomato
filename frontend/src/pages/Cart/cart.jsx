import React, { useContext } from 'react'
import "./cart.css";
import {storeContext} from "../../context/storeContext";
import { useNavigate } from 'react-router-dom';

const cart = () => {

  const {cartItem, food_list, removeFromCart,getTotalCartAmount,url} = useContext(storeContext);

  const navigate = useNavigate();
  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br/>
        <hr/>
        {food_list.map((item,index)=>{
          const itemQuantity = cartItem[item.id] || 0; // Handle undefined cases
          if (itemQuantity > 0){
    
            return (
              <div>
              <div className="cart-items-title cart-items-item" key={index}>
              <img src={`${url}/images/${item.image}`}/>
              <p>{item.name}</p>
              <p>{item.price}</p>
              <p>{cartItem[item.id]}</p>
              <p>{item.price * cartItem[item.id]}</p>
              <p onClick={()=> removeFromCart(item.id)} className='cross'>X</p>
              </div>
              <hr />
              </div>
            )
          }
          return null; 
        })}
        </div>  
        <div className="cart-bottom">
          <div className="cart-total">
            <h2>Cart Totals</h2>
            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>${getTotalCartAmount()}</p>
              </div>
              <hr/>
              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>${getTotalCartAmount() === 0? 0: 2}</p>
              </div>
              <hr/>
              <div className="cart-total-details">
                <b>Total</b>
                <b>${getTotalCartAmount() === 0? 0:getTotalCartAmount() +2}</b>
              </div>
              <hr/>
            </div>
            <button onClick={()=> navigate('/order')}>PROCEED TO CHECKOUT</button>
          </div>
          <div className="cart-promocode">
            <p>If you have a promo code, Enter it here</p>
            <div className='cart-promocode-input'>
              <input type="text" placeholder='Promo Code' />
              <button>Submit</button>
            </div>
          </div>
        </div>  
      </div>
  )
}

export default cart