import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';
import userModel from '../User.js'
import generateTokenForUser from '../utils/checkAuth.js';


export const registr = async(req,res)=>{

    try{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
         return res.status(400).json(errors.array())
        }
        const password = req.body.password
        const salt = await bcrypt.genSalt(7);
        const hash = await bcrypt.hash(password, salt)
        const doc = new userModel({
            fullName:req.body.fullname,
            email:req.body.email,
            passwordHash:hash,
            avatarUrl:req.body.avatarUrl
        });
        const user = await doc.save();
        const token = generateTokenForUser(user._id);
        const {passwordHash,...userData} = user._doc;
        res.json({...userData,token})
    }catch(err){
        res.json('Please,write name')
    }
    
}

export const login = async(req,res)=>{
    const user = await userModel.findOne({
        email:req.body.email
    })

    if(!user){
        return  res.status(400).json({message:'Profile is not found'}) 
      }
console.log(user._doc)
    const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);

    if (!isValidPass) {
      return res.status(400).json({
        message: 'Failed password...',
      });
    }
        const token = await generateTokenForUser(user._id);
        const {passwordHash,...userData} = await user._doc;
      await  res.json({...userData,token})
    
};

export const authMe = async(req,res,next)=>{
    try{
        const user = await userModel.findById(req.userId);
        const token = req.headers.Authorization
        const {passwordHash,...userData} = user._doc;
        res.json(userData)

    }catch(e){
        res.json('oshibka get auth/user')
    }
}

