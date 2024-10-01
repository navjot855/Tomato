import pool from '../db.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validator from 'validator';



//login user
const loginUser = async(req,res)=>{
    const {email,password} = req.body;
    try {

        const user = await pool.query('select * from users where email=$1' ,[email]);
        
        if(!user.rows[0]){
            return res.json({success:false, message: 'user does not  exists'})
        }
        
        const isMatch = await bcrypt.compare(password,user.rows[0].password);
        if(!isMatch){
            return res.json({success:false, message: 'Invalid Password'});
        }
        const token = createToken(user.rows[0].id);
        res.json({success: true, token});
    } catch (error) {
        console.log(error);
    }
}
const createToken =(id)=>{
return jwt.sign({id},process.env.JWT_SECRET )
}
//register user
const registerUser = async(req,res)=>{
    const {name, password,email} = req.body;
    try {

        // checking if a user already exists
        const { rows: existingUsers, rowCount } = await pool.query('select * from users where name=$1 and email=$2 ', [name,email])
        if (rowCount > 0){
            return res.json({success:false,message:"user already exists"})
        }

        //validating email and password
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Please enter a valid email"})
        }
        //checking password length

        if(password.length < 8){
            return res.json({success:false,message:"Please enter a strong password"})
        }

        //encrypt the password

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = await pool.query('insert into users (name,email, password) values($1,$2,$3 ) returning *',[name,email,hashedPassword]);
        const result = newUser.rows[0];
        const token = createToken(result.id);
       
        res.json({success: true,  token})
    } catch (error) {
        
        res.json({success: false, message: error })
    }
}


export {loginUser,registerUser}