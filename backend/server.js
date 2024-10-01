import express from "express";
import cors from "cors";
import pool from './db.js';
import cartRouter from "./routes/cartRoute.js";
import './models/usermodel.js';
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userroute.js";
import 'dotenv/config'
import orderRouter from "./routes/orderRoute.js";
//app config

 const app  = express()
 const port = 4000


 //middlewares

 app.use(express.json())
 app.use(cors())

 //api end point
 app.use('/api/user',userRouter);
 app.use('/api/food',foodRouter);
 app.use('/images',express.static('uploads'));
 app.use('/api/cart',cartRouter);
 app.use('/api/order',orderRouter);

 

 app.get('/', async (req,res)=>{
   const data = await pool.query('Select * from random_table');
   res.json(data.rows);
 })

 app.get('/',(req,res)=>{
    res.send("API woring")
 })

 app.listen(port, ()=>{
    console.log(`Server started on http://localhost:${port}`)
 })