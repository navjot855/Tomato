import pool from '../db.js';
import "../models/orderModel.js";
import Stripe from 'stripe';



const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//placing user order from frontend
const placeOrder = async(req,res)=>{
    
    const frontendUrl = "http://localhost:5173";
    try {
        const userId  = req.body.userId;
        const items = JSON.stringify(req.body.items);
        const amount  = req.body.amount;
        const address = req.body.address;
        const status = 'food processing';
        
        const newOrder = await  pool.query("Insert into orders (userid,items,amount,address,status,payment) values($1,$2,$3,$4,$5,false) returning * ",[userId,items,amount,address,status]);
       
        
        pool.query("UPDATE users set cartData = '{}' where id= $1" , [userId])

        const line_items = req.body.items.map((item)=>({
            price_data:{
                currency:"cad",
                product_data:{
                    name:item.name
                },
                unit_amount: item.price* 100
            },
            quantity: item.quantity
        }))
        
        line_items.push({
            price_data:{
                currency: "cad",
                product_data:{
                    name: "delivery Charges"
                },
                unit_amount: 2* 100
            },
            quantity: 1
        })
        
        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment',
            success_url: `${frontendUrl}/verify?success=true&orderId=${newOrder.rows[0].orderid}`,
            cancel_url: `${frontendUrl}/verify?success=false&orderId=${newOrder.rows[0].orderid}`,
        })

        res.json({success:true, session_url: session.url})
    } catch (error) {
        console.log(error);
        res.json({success: false, message:error })
    }

}


const verifyOrder = async(req,res)=>{
    const {orderid, success} = req.body;
    try {
        
        if(success == "true"){
            
            const response = await pool.query('UPDATE orders set payment = true  where orderid = $1 ',[orderid]);
            res.json({success: true,message:"paid"});
        }
        else{
            const response = await pool.query('DELETE FROM orders WHERE orderid = $1', [orderid]);
            res.json({success:false, message:"not paid"})
        }
    } catch (error) {
        console.log(error);
    }
}


const userOrders = async(req,res) =>{

    try {
        const orders = await pool.query('select * from orders where userid= $1',[req.body.userId]);
        res.json({success: true, data: orders.rows })
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error"});
    }
}

//listing order for admin panel
const listOrders = async(req,res)=>{
    try {
        const orders = await pool.query('Select * from orders');
        res.json({success: true, data: orders.rows});
    } catch (error) {
        console.log(error);
        res.json({success: false, error: "error"});
    }
}

//update status
const updateStatus = async (req,res)=>{
    try {
        
        const response = await pool.query('UPDATE orders SET status=$1 WHERE orderid=$2 RETURNING *',[req.body.status, req.body.orderid]);
        console.log(response.rows);
        res.json({success: true, message: "Status Updated"});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "error"});
    }

}
export {placeOrder,verifyOrder,userOrders,listOrders,updateStatus};