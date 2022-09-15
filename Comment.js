import mongoose from 'mongoose';


const CommentSchema = new mongoose.Schema({
    text:{type:String,required:true},
    user:{type:mongoose.Schema.Types.ObjectId,ref:'users',required:true},
    postId:{type:String,required:true}
},{
    timestamps:true
}
)

export default mongoose.model('comment',CommentSchema)