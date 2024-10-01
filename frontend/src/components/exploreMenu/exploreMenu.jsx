import React from 'react';
import "./exploreMenu.css";
import { menu_list } from '../../assets/assets';


const exploreMenu = ({category,setCategory}) => {

  return (
    <div className='exploreMenu' id='explore-menu'>
        <h1>Explore Our Menu</h1>
        <p className='exp-text'>Choose from a diverse menu featuring a delectable array of dishes. Our mission is to satify your cravings  and elevate your dining experience , one delicious meal at  a time.</p>
        <div className="exp-menu-list">
            {menu_list.map((item,index)=>{
                return(
                    <div onClick={()=> setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)} key={index} className="exp-menu-list-item">
                        <img className={category === item.menu_name ? "active": ""} src={item.menu_image} alt="" />
                        <p>{item.menu_name}</p>
                    </div>
                )
            })}
        </div>
        <hr/>
    </div>
  )
}

export default exploreMenu