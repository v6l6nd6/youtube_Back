import jwt from 'jsonwebtoken';

export default (id)=>{

   return jwt.sign({_id:id},'secret666',{expiresIn:'30d'})
   
}