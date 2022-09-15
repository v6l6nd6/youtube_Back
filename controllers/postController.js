import PostModel from '../Post.js';

export const getAll = async (req, res) => {
    let sortParam = req.query.sortBy
    try {

        if (sortParam == 'datePost') {
            const posts = await PostModel.find().sort({ updatedAt: 'desc', test: -1 }).populate('user').exec();
            res.json(posts)
        }
        else if (sortParam == 'views') {
            const posts = await PostModel.find().sort({ viewsCount: 'asc', test: -1 }).populate('user').exec();
            res.json(posts)
        }
        else {
            const posts = await PostModel.find().populate('user').exec();
            res.json(posts)
        }

    } catch (err) {
        res.status(500).json({
            message: 'Couldn`t get the articles'
        })
    }
};

export const getOne = async (req, res) => {
    try {
        const postId = req.params.id;
        PostModel.findOneAndUpdate({ _id: postId }, { $inc: { viewsCount: 1 } }, { returnDocument: 'after' }, (err, doc) => {
            if (err) {
                res.status(500).json({ message: 'Failed to return the article' })
            }
            if (!doc) {
                return res.status(404).json({ message: 'Article not found' })
            }
            res.json(doc)
        }).populate('user')

    } catch (error) {
        res.status(500).json({ message: 'Failed to load post' })
    }
}

export const deleteOne = async (req, res) => {
    try {
        const postId = req.params.id;
        PostModel.findOneAndDelete({ _id: postId }, (err, doc) => {
            if (err) {
                return res.status(500).json({ message: 'Failed to delete article' })
            }
            if (!doc) {
                return res.status(404).json({ message: 'Failed to find atricle' })
            }
            res.json({ success: true })
        })
    } catch (error) {
        res.status(500).json({ message: 'Failed to load post' })
    }
}

export const updateOne = async (req, res) => {
    const postId = req.params.id;
    try {
        await PostModel.updateOne(
            {
                _id: postId
            },
            {
                title: req.body.title,
                text: req.body.text,
                imageUrl: req.body.imageUrl,
                tags:req.body.tags.split(' '),
                user: req.userId
            }
        );
        res.json({
            success: true
        })
    }
    catch (err) {
        res.status(500).json({ message: 'Failed with update of article' })
    }

}





export const create = async (req, res) => {
    // const user = await UserModel.findById()
    try {
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags.split(' '),
            user: req.userId
        });

        const post = await doc.save();
        res.json(post)
    } catch (error) {
        res.status(500).json({ message: 'Failed to load post' })
    }
}


