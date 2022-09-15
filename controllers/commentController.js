import PostModel from '../Post.js';
import CommentModel from '../Comment.js';


export const getAllComments = async (req, res) => {
    try {
        const comments = await CommentModel.find().sort({ updatedAt: 'desc', test: -1 }).populate('user',['fullName','avatarUrl']).exec()
        res.json(comments)
    } catch (err) {
        res.json('Error!!!')
    }
}

export const getOneComment = async (req, res) => {
    try {
        const comment = await CommentModel.findById(req.params.id).populate('user').exec()
        res.json(comment)
    } catch (err) {
        res.json('Error!!!')
    }
}

export const deleteComment = async (req, res) => {
    try {
         await CommentModel.findByIdAndDelete(req.params.id).exec()
        res.json({message:'succeful'})
    } catch (err) {
        res.json('Error!!!')
    }
}

export const postOneComment = async(req,res)=>{

    const postId = req.params.id;
    try{
        const doc = new CommentModel({
            text:req.body.text,
            user:req.userId,
            postId
        })
         await doc.save()
      res.json(doc)
        // PostModel.findOneAndUpdate({ _id: postId },  { $push: {comments: readyComment}}, { returnDocument: 'after' }, (err, doc) => {
        //     if (err) {
        //         res.status(500).json({ message: 'Failed to return the article' })
        //     }
        //     if (!doc) {
        //         return res.status(404).json({ message: 'Article not found' })
        //     }
        //     res.json(doc)
        // }).populate('user')

    }catch(err){
        res.status(400).json(err)
    }
}