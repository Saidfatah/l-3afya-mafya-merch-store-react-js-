import React,{useState} from 'react'
import {useForm} from 'react-hook-form'
import axios from 'axios'

function ImageUploader(props) {
    const{title}=props
    const [previewImages,setPreviewImages]=useState([])
    const {register,handleSubmit}=useForm()
    const selectImage=e=>{
        let imagesArr=[]
        for (let index = 0; index <e.target.files.length; index++) {
            imagesArr.push(URL.createObjectURL(e.target.files[index]))
        }
        setPreviewImages(imagesArr)
    }

   const onSubmit=async (data)=>{
     const form = new FormData();
     for (let index = 0; index < data.myImages.length; index++) {
         form.append('img'+(index+1), data.myImages[index]);
     }
     const res = await fetch('http://localhost:4000/product/uploadImages/'+'title',
                {
                    method:'POST',
                    body:form,
                }).then(res=>console.log('res'))
                  .catch(err=>console.log(err))
   }
    return (
        <div>
            <h1>Product Images</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="createForm" >
                <div className="formGroup">
                    <input type="file"    
                            name="myImages"
                            ref={register} 
                            multiple
                            onChange={selectImage}
                            />
                    <div className="multiImagesPreview">
                           {(previewImages|| []).map((url,index) => (<img key={index} src={url} alt="..." /> ))}
                     </div>
                </div>
                <button type="submit" className="btn"   >Upload</button>
            </form>
            {/* <form action={'http://localhost:4000/product/uploadImages/'+'title' }method="post" encType="multipart/form-data" className="createForm" >
                <div className="formGroup">
                    <input type="file"    
                            name="myImages"
                            multiple
                            onChange={selectImage}
                    />
                    <input type="text" name="title" value="product1" />
                    <div className="multiImagesPreview">
                           {(previewImages|| []).map((url,index) => (<img key={index} src={url} alt="..." /> ))}
                     </div>
                </div>
                <button type="submit" className="btn"   >Upload</button>
            </form> */}
            <a href='' onClick={e=>{
                e.preventDefault()
                localStorage.setItem('submitedValues',false) 
                }}>back To Product details</a>
        </div>
    )
}

export default ImageUploader
