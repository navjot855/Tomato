import React,{useContext} from 'react';
import "./foodItem.css";
import { assets } from '../../assets/assets';

import { storeContext } from '../../context/storeContext';
const foodItem = ({id,name,description,price, image}) => {


    const {cartItem, addToCart, removeFromCart,url} = useContext(storeContext);
  return (
    <div className='food-item'>
      <div className="food-item-img-container">
        <img className='food-item-image' src={`${url}/images/${image}`} />
        {!cartItem[id] 
        ?<img className='add' src={assets.add_icon_white} onClick={()=> addToCart(id) }  />
        : <div className="food-item-counter">
            <img onClick={()=> removeFromCart(id)} src={assets.remove_icon_red}/>
            <p>{cartItem[id]}</p>
            <img onClick={()=> addToCart(id)} src={assets.add_icon_green}/>
        </div>
        }
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
            <p>{name}</p>
            <img src={assets.rating_starts} />
        </div>
        <p className="food-item-desc">
            {description}
        </p>
        <p className="food-item-price">${price}</p>
      </div>
    </div>
  )
}

export default foodItem
