
import mongoose from 'mongoose';


const userShema = new mongoose.Schema({
    fullName:{type:String,required:true},
    email:{type:String,required:true},
    passwordHash:{type:String,required:true},
    avatarUrl:{type:String}
},{
    timestamps:true
}
)

export default mongoose.model('users',userShema)