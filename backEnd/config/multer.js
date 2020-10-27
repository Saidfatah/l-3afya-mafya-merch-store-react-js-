const multer = require('multer')
const path = require('path')
const fs = require('fs')
//get product title 
//create directory 



const imagesplaodDirector=process.env.NODE_ENV == 'production' ?'build/images/products/' :'./src/images/products/'
 
const storage = multer.diskStorage({
                     destination:(req, file, cb)=>{
                          console.log()
                          var dir = imagesplaodDirector+req.params.title;
                          if (!fs.existsSync(dir)){
                              fs.mkdir(dir,()=>{
                                   cb(null, dir)
                              })
                          }else{
                              cb(null, dir)
                          }
                     },
                     filename:(req,file,cb)=>{
                          cb(null,file.fieldname +path.extname(file.originalname) )
                     }
})

const upload = multer({
    storage:storage,
}).any()
module.exports= upload


