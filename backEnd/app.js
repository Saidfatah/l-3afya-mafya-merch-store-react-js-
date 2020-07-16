const path = require('path')
const express= require('express')
const app = express()
const cors =require('cors')
var fs = require('fs')


app.use(cors())
const Imagesdir = path.join(__dirname, 'images/products');
app.use(express.static(Imagesdir));


var mime = {
    html: 'text/html',
    txt: 'text/plain',
    css: 'text/css',
    gif: 'image/gif',
    jpg: 'image/jpeg',
    png: 'image/png',
    svg: 'image/svg+xml',
    js: 'application/javascript'
};

app.get('/images/:productTitle',  (req, res)=> {
    const productTitle= req.params.productTitle
    const file = path.join(Imagesdir, '/'+productTitle);

    fs.readdir(file,  (err, files) =>{
        if (err) return console.log('Unable to scan directory: ' + err)
             const type = mime[files[0].split('.')[1]] 
           
             console.log(file+'/'+files[0])
             var s = fs.createReadStream(file+'/'+files[0])
             s.on('open', ()=>{
                 res.set('Content-Type', type)
                 s.pipe(res)
             });
             s.on('error', () =>{
                 res.set('Content-Type', 'text/plain')
                 res.status(404).end('Not found')
             })
    })
 

});

app.listen(4000,  ()=> {
    console.log('Listening now');
});