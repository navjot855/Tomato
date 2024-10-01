import React  from 'react'
import "./home.css";
import Header from  "../../components/header/header";
import ExploreMenu from '../../components/exploreMenu/exploreMenu';
import FoodDisplay from '../../components/food_display/food_display';
import AppDownload from '../../components/appDownload/appDownload';
import { useState } from "react";

const home = () => {
  const [category,setCategory] = useState("All");

  return (
    <>
    <Header/>
    <ExploreMenu category={category} setCategory={setCategory} /> 
    <FoodDisplay category={category}/> 
    <AppDownload/>
    </>
  )
}

export default home