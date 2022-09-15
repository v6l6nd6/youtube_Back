import express from 'express';
import mongoose from 'mongoose';
import { loginValidation, registrValidation, postCreateValidation } from './validations/validations.js';
import authMiddleware from './utils/authMeMiddleware.js';
import * as UserController from './controllers/userControllers.js';
import * as PostController from './controllers/postController.js';
import * as CommentController from './controllers/commentController.js';
import * as TagsController from './controllers/tagsController.js';
import { uploadMiddleWare, uploadFunc } from "./uploadFile.js";
import handleValidationErrors from './validationErrors.js';
import cors from 'cors';


mongoose.connect('mongodb+srv://lord:wwwwww@cluster0.udx61lc.mongodb.net/blog?retryWrites=true&w=majority').then(() => {
    console.log('DB ok ')
}).catch((err) => {
    console.log(`DB error - ${err}`)
})

const app = express();

app.use(express.json());
app.use(cors())
app.use('/uploads', express.static('uploads'))


//=====auth
app.get('/auth/me', authMiddleware, UserController.authMe);
app.post('/auth/registr', registrValidation, handleValidationErrors, UserController.registr)
app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login)

//=====posts
app.get('/posts', PostController.getAll);

app.get('/posts/:id', PostController.getOne);
app.post('/posts', authMiddleware, postCreateValidation, handleValidationErrors, PostController.create);
app.delete('/posts/:id', authMiddleware, PostController.deleteOne);
app.patch('/posts/:id', authMiddleware, postCreateValidation, handleValidationErrors, PostController.updateOne);

//=====comments
app.get('/comments',CommentController.getAllComments)
app.post('/comments/:id',authMiddleware,CommentController.postOneComment)
app.delete('/comments/:id',CommentController.deleteComment)
app.get('/comment/:id',authMiddleware,CommentController.getOneComment)

//=====tags
app.get('/tags', TagsController.getLastTags);
app.get('/tags/:tagParam', TagsController.getTagsOfOneName);
// app.get('/posts/tags', TagsController.getLastTags);

//=====upload
app.post('/upload', uploadMiddleWare.single('image'), uploadFunc)

app.listen(4444, (err) => {
    if (err) {
        return console.log('Oshibka')
    }
    console.log('Server OK')
})