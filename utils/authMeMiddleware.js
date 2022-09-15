import { json } from "express"
import jwt from 'jsonwebtoken'


export default (req,res,next)=>{

    if(req.method==='OPTIONS'){
        next() 
    }
    try{
        const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');
        const decodedData = jwt.verify(token,'secret666')
        req.userId=decodedData._id
        next()
    }
    catch(e){
        return res.status(404).json({message:'This user is not authorizations authMidleware'})
    }

}