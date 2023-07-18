import sharp from 'sharp';
import multer from 'multer';
import path from 'path';


const multerStorage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.join(__dirname,"../public/images"))
    },
    filename: function(req,file,cb){
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random()* 1e9);
        cb(null, file.fieldname + "-" + uniqueSuffix + ".jpeg");
    }
});

const multerFilter = (req,file,cb)=>{
    if(file.mimetype.startsWith('image')){
        cb(null,true);
    }else{
        cb(
            {
                message: "Unsopported Format"
            }, 
            false
        )
    }
}
export const uploadPhoto = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
    limits: {fileSize: 2000000}
})

const productImgResize =async (req,res,next)=>{
    if(!req.files){ return next()}
}