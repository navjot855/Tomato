import pool from '../db.js';
import fs from 'fs';
import { addFood, foods } from "../models/food_model.js";

const addfood = async(req,res)=>{
    console.log(req.body);
    if (!req.file) {
        res.status(400).json({ success: false, message: "No file uploaded" });
    } 
    let image_filename = `${req.file.filename}`;
    const { name, description, price, category } = req.body;
    const result = await addFood( name, description, price,image_filename,category );
    if (result.success) {
        res.status(201).json(result);
    } else {
        res.status(500).json(result);
    }

}
// list all the food items
const listFood = async(req,res)=>{
    try {
        const result= await foods();
        res.status(201).json({success: true,data:result});
        
    } catch (error) {
        res.status(500).json({success: false, message: 'Internal Server Error' });
    }
}
export {addfood,listFood}; 

// remvoe food items

export const removeFood = async(req,res)=>{
    try {
        const {id,image} = req.body;
        fs.unlink(`uplods/${image}`,()=>{})
        const result = await pool.query(`delete from food where id=$1`,[id]);
        res.status(201).json({success: true, message:`deleted ${result.rowCount} row(s)`});

    } catch (error) {
        console.error("error deleting food", error);
        throw error;
    }
}