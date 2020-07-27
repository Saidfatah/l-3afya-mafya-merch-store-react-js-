const router = require('express').Router();
const fs = require('fs');
const { title } = require('process');


router.get('/:title',(req,res)=>{
     fs.readdir("public/images/products",(err, files) =>{
        if (err) return console.log('Unable to scan directory: ' + err)
        files.forEach(file=>{
            if(file == 'skeleton T-Shirt'){
                 fs.readdir("public/images/products/"+req.params.title,(err, files) =>{
                    if (err) return console.log('Unable to scan directory: ' + err)
                    res.send(files[0].split('.')[1])
               
                })
            }
        })

    })
})


module.exports = router
