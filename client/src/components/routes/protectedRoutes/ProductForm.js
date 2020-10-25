import React,{useState,useRef,useEffect} from 'react'
import axios from 'axios'
import {useFormik} from 'formik'
import {jwtCheck,getToken} from '../../Auth/Auth'
import {Button,RawLink} from '../../../Style/global'
/** @jsx jsx */
import { jsx, css } from '@emotion/core'


const initialValues= {
    title:'product title',
    price:30,
    sizes:[],
    character:[],
    images:[]
}


const ProductForm=()=> {
    const [characteristics,setCharacteristics]=useState([])
    const [sizes,setSizes]=useState([])
    const charcteristcRef = useRef()
    const charcteristcInputRef = useRef()
    const [previewImages,setPreviewImages]=useState([])
    const [errs, seterrs] = useState({
        imagesReq :false,
        charactersReq:false,
        titleReq:false,
        priceLow:false
    })
    const apiurl=process.env.API_URL


    useEffect(()=>{
        formik.setFieldValue('character', characteristics)
        formik.setFieldValue('sizes', sizes)
        formik.setFieldValue('images', previewImages)
    },[characteristics,sizes,previewImages,errs])
   
   
    const validateFields=(values)=>{
         const {title,price,images,character}=values
         const errsObjTemp ={...errs}
         let errsCount = 0 ; 
         if(images.length <1) {
        errsObjTemp.imagesReq=true
         errsCount++
         }
         if(character.length <1){
         errsObjTemp.charactersReq=true
         errsCount++
         }
         if(title =='') {
         errsObjTemp.titleReq=true
         errsCount++
         }
         if(price <10){
         errsObjTemp.priceLow=true
         errsCount++
         }
     
         seterrs({...errsObjTemp})
         return errsCount>0 ? false :true
    }
    const onSubmit =async values=>{
         try {
             if(!validateFields(values)) return ; 
             if(jwtCheck()){
                  const token =getToken()
                  const header= {headers:{"Authorization" : `Bearer ${token}`}}
       
                  let constImageUploadPromise ;
                  let imagesNames=[];

                  const formData = new FormData();
                  for (let index = 0; index < values.images.length; index++) 
                  {    
                     formData.append('img'+(index+1), values.images[index]);
                     const splits = values.images[index].name.split('.')
                     const ext=splits[splits.length-1]
                     imagesNames.push('img'+(index+1)+'.'+ext)
                  }
               
                  if(formData != undefined)
                     constImageUploadPromise = await fetch(apiurl+'/product/uploadImages/'+values.title,{method:'POST',body:formData})


                  if(constImageUploadPromise.status != 200) throw new Error('IMAGE_UPLOAD_FAIL')
                  delete values.images
                  const constProductUploadPromise = await axios.post(apiurl+'/product/create',
                                                                     {...values,images:imagesNames},header)
                  console.log(constProductUploadPromise)
             } 
        } catch (error) {
            if(error.message =='IMAGE_UPLOAD_FAIL') console.log('IMAGE_UPLOAD_FAIL')
            console.log(error)
        }
    }
    const formik = useFormik({
        initialValues,
        onSubmit
    })
    const addCharcter=e=>{
        const charcter =charcteristcInputRef.current.value
        setCharacteristics([...characteristics,charcter])
    }
    const removeCharacter=e=>{
        console.log('clickk')
        if(e.target.classList.contains('remove')){
            const nodeListOfCharacters= Array.from(e.target.parentElement.parentElement.querySelectorAll('li'))
            let chracterList = [...characteristics]
            chracterList = chracterList.filter((char,index)=> index != nodeListOfCharacters.indexOf(e.target.parentElement))
             setCharacteristics([...chracterList])
        }
    }
    const addSize=e=>{
        e.preventDefault()
        if(e.target.tagName.toLowerCase() == 'button')
        {
             if(e.target.classList.contains('selected-Size'))
             {
                e.target.classList.remove('selected-Size')
                let newSizes= sizes
                newSizes = newSizes.filter(s=>s!=e.target.innerHTML)
                setSizes([...newSizes])
                return ;
             }
             setSizes([...sizes,e.target.innerHTML])
             e.target.classList.add('selected-Size')
        }
    }
    const characteristicsList=()=>{
    return(
        <div css={styles.product__charactersristics} >
             <div>
                 <input 
                  type="text" 
                  name="charcter" 
                  onBlur={formik.handleBlur} 
                  placeholder="charcterstic " 
                  ref={charcteristcInputRef}
                  /> 
                 <button 
                  type="button"
                  onClick={addCharcter} 
                  css={styles.add}
                  > add </button>
             </div>
             <ul  ref={charcteristcRef} >
                 {
                  characteristics.map((char,index)=><li  id={index}  key={index}>
                      <span>{char}</span> 
                      <button css={styles.remove} onClick={removeCharacter}>remove</button>
                  </li>)
                 } 
             </ul>
        </div>
       )
    }
    const sizeSelect=()=>{
        return  <div  css={styles.product__size} onClick={addSize}>
            <button css={styles.size}>S</button>
            <button css={styles.size}>M</button>
            <button css={styles.size}>L</button>
            <button css={styles.size}>XL</button>
            <button css={styles.size}>2X</button>
            <button css={styles.size}>3X</button>
         </div> 
    }
    const selectImage=e=>{
         let imagesArr=[]
         for (let index = 0; index <e.target.files.length; index++) 
             imagesArr.push(e.target.files[index])
         
         setPreviewImages(imagesArr)
    }
    const Err=({message,trigger})=>{
        if(!trigger) return ''
        return <div className="error">{message}</div>
    }

    return (
        <div>      
           <h1> ADD NEW PRODUCT </h1>
           <form onSubmit={formik.handleSubmit} css={styles.createForm} >
                <div css={styles.formGroup}>
                     <label>PRODUCT TITLE</label>
                     <input type="text"
                            name="title" 
                            id="title" 
                            onBlur={formik.handleBlur}
                            placeholder="Product Titile" 
                            onChange={formik.handleChange}
                            value={formik.values.title}
                     />
                     <Err message="Product title is required" trigger={errs.titleReq} />
                </div>
                <div css={styles.formGroup}>
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
                     <Err message="Product price should be superiour to 10.00$" trigger={errs.priceLow} />
                </div>
                <div css={styles.formGroup}>
                              <label>PRODUCT AVAILABLE SIZES</label>
                              {sizeSelect()}
                         </div>
                <div css={styles.formGroup}>
                     <label>PRODUCT CHARCTERSTICS</label>
                     {characteristicsList()}
                     <Err message="Product charcteristics are required" trigger={errs.charactersReq} />
                </div>         
                <label>PRODUCT IMAGES</label>   
                <div css={css`${styles.formGroup} ;  border: 1px solid var(--colorGreyFaint); padding: .25rem;  margin-bottom: 1rem; `}>
                    <div css={styles.porportions}>
                        <span>The image propotions should respect </span>
                        <RawLink href="/images/products/L'3afya mafya logo T-Shirt (red)/img1.png" download > in this image </RawLink>
                    </div>
                    <input  type="file"    
                            name="images"
                            css={styles.add}
                            multiple
                            onChange={selectImage}
                    />
                    <div css={styles.images}>
                        {
                             (previewImages|| [])
                             .map((url,index) => (<img 
                             key={index} 
                             src={URL.createObjectURL(url)} 
                             alt="..." /> ))
                        }
                    </div>
                    <Err message="please choose product images " trigger={errs.imagesReq} />
                </div>
               <Button type="submit" width="100%" >Add the Product</Button>
            </form>
       </div>
    )
}

const styles ={
    createProduct:css`
        display: flex;
        padding: 1rem;
        min-height: 100vh;
        justify-content: center;
        h1{
            text-align: center;
            font-size: 2rem;
            letter-spacing: 5px;
          }
    `,
    product__charactersristics:css`
        border: 1px solid var(--colorGreyFaint);
        padding: .25rem;
        margin-bottom: 1rem;
        ul{
            overflow-y: scroll;
            height:100px;
        }
        ul li{
            background-color:var(--colorGreyFaint);
            color: var(--colorGrey);
            margin-bottom: 1rem;
            padding: .25rem;
            margin: .25rem 0;
            display: flex;
            justify-content: space-between;
            font-size: 1rem;
        }
        >div{
            display:flex;
            justify_content:space-bettwen;
            align_items:center;
            width:100%;
            height:30px;

        }
       input{
            width:fit-content;
           flex:2;
        }
    `,
    add:css`
       background-color:#fff;
       border-radius:12px;
       flex:1;
       padding: 0 .5rem;
    `,
    remove:css`
        background-color:var(--colorError);
        border: none;
        color: #fff;
        cursor: pointer;
        padding: .25rem;
    `,
    size:css`
        padding:.25rem;
    `,
    
    product__size:css`
        padding: 0;
        border: 1px solid var(--colorGreyFaint);
        display: flex;
        width:100%;
        list-style: none;
        height: 45px;
        align-items: center;
        justify-content: space-evenly;
        margin-bottom: 1rem;
       
        button{
            background-color:#fff;
            border:none;
            padding: .25rem;
            margin-right: .5rem;
            cursor: pointer;
        }

        button:hover{
            transform: scale(1.2);
        }

    `,
    images:css`
        display: flex;
        width: 100%;
        flex-wrap: wrap;
        img{
            width: 100px;
        }
    `,
    porportions:css`
       margin-bottom:.5rem;
       span , a {
           font-size:.8rem;
       }
       a {
          color:var(--colorPrimary)
       }
    `,
    formGroup:css`
        margn-bottom:1rem;
    `,
    createForm:css`
    width: 500px;
    margin: 1rem;
    padding: 1rem;
    height: fit-content;
    input{
        border: 1px solid var(--colorGreyFaint);
    }
    label{
      letter-spacing: 5px;
      color: var(--colorGrey);
      margin-bottom: 1rem;
     
    }
    input{
      width: 100%;
    }
    `,
}
export default ProductForm
