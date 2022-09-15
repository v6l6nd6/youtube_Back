import  {body} from 'express-validator';

export const loginValidation = [
    body('email','unvalid Email').isEmail(),
    body('password','password must be correct').isLength({min:3,max:15}),
]

export const registrValidation = [
    body('fullname','name should be better').isLength({min:3}),
    body('email','unvalid Email').isEmail(),
    body('password','password must be correct').isLength({min:3,max:15})
]


export const postCreateValidation = [
    body('title','Enter article title').isLength({min:3}).isString(),
    body('text','Enter article text').isLength({min:5}).isString(),
    body('tags','Invalid format of tags(array please)').optional().isString(),
    body('imageUrl','Invalid URL of image').optional().isString()
]
