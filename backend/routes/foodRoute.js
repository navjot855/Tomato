import express from  'express';
import { addfood, listFood } from '../controllers/controllers.js';
import { removeFood } from '../controllers/controllers.js';
import multer from 'multer';

const foodRouter = express.Router();

//image storage Engine
const storage = multer.diskStorage(
    {destination:'uploads',
    filename:(req,file,cb)=>{
        return cb(null, `${Date.now()}_${file.originalname}`)
    }
});

const upload = multer({storage:storage})

//routes
foodRouter.post("/add", upload.single('image'),addfood);

foodRouter.get("/listFood",listFood);

foodRouter.delete("/removeFood", removeFood);





export default foodRouter;