import React ,{useContext}from 'react';
import "./food_display.css";
import { storeContext } from '../../context/storeContext';
import FoodItem from '../foodItem/foodItem';
const food_display = ({category}) => {
    const {food_list} = useContext(storeContext);

  return (
    <div className='food-display'>
      <h2>Top dishes near you </h2>
      <div className="food-display-list">
      {
        food_list.map((item,index)=>{
          if(category==="All" || category === item.category){
            return(
              <FoodItem key={index} id={item.id} name={item.name} description={item.description} price={item.price} image={item.image} category={item.category} />
          )
          }
            
        } )
      }
      </div>
      
    </div>
  )
}

export default food_display
