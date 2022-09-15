import multer from 'multer';

 const storage = multer.diskStorage({
    destination(req,file,cb){
        cb(null,'uploads')
    },
    filename(req,file,cb){
        cb(null,file.originalname)
    }

})

const types = ['uploads/png','uploads/jpeg','uploads/jpg'];

const fileFilter = (req,file,cb)=>{
    if(types.includes(file.mimetype))
    cb(null,true)
    else {
        cb(null,false)
    }
}

export const uploadFunc = (req,res)=>{
    try {
        res.json({
            url: `/uploads/${req.file.originalname}`,
        })
    } catch (err) {
        res.json({
            message: `fail with send photo`,
        })
    }
}
    

export const uploadMiddleWare = multer({storage})