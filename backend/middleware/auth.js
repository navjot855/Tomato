import jwt from "jsonwebtoken";

const authMiddleware = async(req,res,next)=>{
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.replace('Bearer ', '').trim();
   if(!token){
    
    return res.json({success: false, message: "not Authorized Login Again"});
   }
   try {
    const token_decode = jwt.verify(token,process.env.JWT_SECRET);
    req.body.userId = token_decode.id;
    next();
   } catch (error) {
    console.log(error);
    res.json({success: false, message:error});
   }
}
export default authMiddleware;