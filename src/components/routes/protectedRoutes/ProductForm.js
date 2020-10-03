import React,{useState,useRef,useEffect} from 'react'
import axios from 'axios'
import {useFormik} from 'formik'
import {jwtCheck,getToken} from '../../Auth/Auth'
import ImageUploader from './ImageUploader'
const initialValues= {
    title:'product title',
    price:30,
    sizes:[],
    character:[]
}


const validate =values=>{
    const {title,price,sizes,character}=values
    let errors ={} ; 
    if(title =='')errors.title='title is required'
    if(price <10)errors.price='price should be higher than 10 dollars'
    if(character.length <1)errors.character='product charcters are required'
   
    return errors
}
function ProductForm() {
    const [hasSize,setHasSize]=useState(true)
    const [submitedValues,setSubmitedValues]=useState(true)
    const [characteristics,setCharacteristics]=useState([])
    const [sizes,setSizes]=useState([])
    const charcteristcRef = useRef()
    const charcteristcInputRef = useRef()

    
    useEffect(()=>{
        formik.setFieldValue('character', characteristics)
        formik.setFieldValue('sizes', sizes)
    //    if( localStorage.getItem('submitedValues')!=undefined)setSubmitedValues(localStorage.getItem('submitedValues'))
       
    },[characteristics,sizes,submitedValues])
   
   
   
    const onSubmitSucces=res=>{
        localStorage.setItem('submitedValues',true) 
        setSubmitedValues(true)
    }
    const onSubmit =values=>{
        if(jwtCheck()){
             const token =getToken()
             const header= {
                headers:{
                    "Authorization" : `Bearer ${token}`,
                }
             }
             axios.post('http://localhost:4000/product/create', values,header)
                  .then(onSubmitSucces)
                  .catch(err=>console.log(err))
        }
     
    }
    const formik = useFormik({
        initialValues,
        onSubmit,
        validate
    })
    

    const addCharcter=e=>{
        const charcter =charcteristcInputRef.current.value
        setCharacteristics([...characteristics,charcter])
    }
    const removeCharacter=e=>{
        if(e.target.classList.contains('remove')){
            const nodeListOfCharacters= Array.from(e.target.parentElement.parentElement.querySelectorAll('li'))
            let chracterList = [...characteristics]
            chracterList = chracterList.filter((char,index)=> index != nodeListOfCharacters.indexOf(e.target.parentElement))
             setCharacteristics([...chracterList])
        }
    }
    const addSize=e=>{
        e.preventDefault()
        if(e.target.classList.contains('size'))
        {
             if(e.target.classList.contains('selected-Size'))
             {
                e.target.classList.remove('selected-Size')
                let newSizes= sizes
                newSizes = newSizes.filter(s=>s!=e.target.innerHTML)
                setSizes([...newSizes])
                return
             }
             setSizes([...sizes,e.target.innerHTML])
             e.target.classList.add('selected-Size')
        }
    }
    const characteristicsList=()=>  
          {
              return  <div className="product_charactersristics" >
                             <div>
                                 <input type="text" name="charcter" onBlur={formik.handleBlur} placeholder="charcterstic " className="charcter"  ref={charcteristcInputRef}/> 
                                 <button type="button" onClick={addCharcter} className="faintLink link-underlined"> add to charcteristics</button>
                             </div>
                             <ul  ref={charcteristcRef} onClick={removeCharacter}>
                                 {characteristics.map((char,index)=><li id={index} key={index} ><span>{char}</span> <button className="remove raw__Link">remove</button></li>)} 
                             </ul>
                       </div>
          }
    const sizeSelect=()=>{
        return hasSize?
          <div  className="product__size" onClick={addSize}>
            <button className="size">S</button>
            <button className="size">M</button>
            <button className="size">L</button>
            <button className="size">XL</button>
            <button className="size">2X</button>
            <button className="size">3X</button>
         </div> : null}



    return (
        <div>
           
            {
                !submitedValues?<div> 
                    <h1> ADD NEW PRODUCT </h1>
                    <form onSubmit={formik.handleSubmit} className="createForm" >
                <div className="formGroup">
                     <label>PRODUCT TITLE</label>
                     <input type="text"
                            name="title" 
                            id="title" 
                            onBlur={formik.handleBlur}
                            placeholder="Product Titile" 
                            onChange={formik.handleChange}
                            value={formik.values.title}
                     />
                    {formik.errors.title && formik.touched.title?<div className="error">{formik.errors.title}</div>:null}
                </div>
                <div className="formGroup">
                     <label>PRODUCT PRICE</label>
                     <input type="number" 
                            name="price" 
                            id="price"
                            onBlur={formik.handleBlur}
                            placeholder="Product price"
                            placeholder="Product Titile" 
                            onChange={formik.handleChange}
                            value={formik.values.price}
                      />
                     {formik.errors.price && formik.touched.price?<div className="error"> {formik.errors.price}</div>:null}
                </div>
                <div className="formGroup">
                     <label>PRODUCT AVAILABLE SIZES</label>
                     {sizeSelect()}
                </div>
                <div className="formGroup">
                     <label>PRODUCT CHARCTERSTICS</label>
                     {characteristicsList()}
                     {characteristics.length<1 && formik.touched.charcter  ?<div className="error">charctersitic are reqiured</div>:null}
                </div>
               
                <button type="submit" className="btn submit">Add the Product</button>
            </form>
                </div>
                               : <ImageUploader title={formik.title} />
            }
        </div>
    )
}

export default ProductForm
