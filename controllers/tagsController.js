
import PostModel from '../Post.js';




export const getLastTags = async (req, res) => {
    try {
        const posts = await PostModel.find().limit(5).exec();
        const tags = posts.map((obj) => obj.tags).flat().slice(0, 5);
        res.json(tags)
    } catch (err) {
        res.status(500).json({
            message: 'Couldn`t get the tags'
        })
    }
}

export const getTagsOfOneName = async (req, res) => {
    // const oneTag = req.body.tag;
    const oneTag = req.params.tagParam
    try {
        const posts = await PostModel.find().exec();
        const tags = posts.map((obj) => obj.tags).flat();
        const result = posts.filter((element) => (element.tags).includes(oneTag))
        res.json(result)
    } catch (err) {
        res.status(400).json({ message: 'cannot find the tag or error' })
    }
}