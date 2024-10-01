
import pool from  '../db.js';


//add items to user cart

const addToCart = async (req,res) =>{
    try {
        let userData = await pool.query("select * from users where id=$1",[req.body.userId]);
        
        let cartData  =  await userData.rows[0].cartdata || {};
        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId] = 1;
        }
        else{
            cartData[req.body.itemId] += 1;
        }
        
        await pool.query("UPDATE users SET cartdata = $1 where id=$2",[cartData,req.body.userId]);
        res.json({success: true, message: "Added to Cart"});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "its an error"});
    }
}


//remove items from cart

const removeFromCart = async (req,res)=>{
try {
    let userData = await pool.query("select * from users where id =$1",[req.body.userId]);
    let cartData  =  await userData.rows[0].cartdata || {};
    
    if(cartData[req.body.itemId] > 0 ){
        cartData[req.body.itemId] -=1;
    }
    if (cartData[req.body.itemId] === 0) {
        delete cartData[req.body.itemId];
    }
    await pool.query(" UPDATE users SET cartdata = $1 where id=$2",[cartData,req.body.userId]);
    res.json({success: true, message: "removed from cart"});
} catch (error) {
    console.log(error);
    res.json({success: false, message: "its an error"});
}
}
// get cart items
const getCart = async (req,res)=>{
    try {
        let userData = await pool.query("select * from users where id =$1",[req.body.userId]);
        let cartData  =  await userData.rows[0].cartdata || {};

        res.json({success: true, cartData: cartData})
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "its an error"});
    }
}

export {addToCart,getCart,removeFromCart}