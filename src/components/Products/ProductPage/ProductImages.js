import React,{useEffect,createRef,useContext,useState} from 'react'
import {MyContext} from '../../../Context/ProductsProvider'

/** @jsx jsx */
import { jsx, css } from '@emotion/core'

const ProductImages=(props)=> {
    const {id}=props
    const img1Container = createRef()
    const img2Container = createRef()
    const [firstsActive,setFirstsActive]=useState(true)
    const [imageSrc1,setimageSrc1]=useState('')
    const [imageSrc2,setimageSrc2]=useState('')
    const {getProductById} =useContext(MyContext)
    const [imageVisibale, setimageVisibale] = useState(true)
    useEffect(() => {
         getProductById(id).then(res=>{
             setimageSrc1('/images/products/'+res.data.title+'/'+res.data.images[0])
             setimageSrc2('/images/products/'+res.data.title+'/'+res.data.images[1])
         })
    }, [id])

    const slideImage=e=>{ setimageVisibale(!imageVisibale)}
    return (
        <div  css={styles.product_images}>
                <div css={styles.imageSlider}>
                     <div ref={img1Container} css={css`${styles.imageSlider__image};opacity:${imageVisibale?0:1};`}>
                         <img  src={imageSrc1} alt="loading ..."/>
                     </div>
                     <div ref={img2Container}   css={css` ${styles.imageSlider__image};opacity:${!imageVisibale?0:1};`}>
                         <img   src={imageSrc2} alt="loading ..."/>
                     </div>
                     <div css={styles.imageSlider__navigate}>
                         <div css={styles.imageSlider__dot} onClick={slideImage}></div>
                         <div css={styles.imageSlider__dot} onClick={slideImage}></div>
                     </div>
                </div>
        </div>
    )
}
const styles ={
    product_images :css`background-color:pink,
    position: absolute;
    top: 0;
    left: 0;
    width: 70%;`,
    imageSlider :css` 
    width: 100%;
    height: 500px;
    position: relative;`,
    imageSlider__image:css`width:400px;
    top: 50%;
    left: 50%;
    position: absolute;
    transform: translate(-50%,-50%);
    transition: all .5s cubic-bezier(0.075, 0.82, 0.165, 1);
    img{
        width: 100%;
    }
    `,
    imageSlider__navigate:css`width:400px;
    top: 100%;
    left: 50%;
    display: flex;
    justify-content: center;
    position: absolute;
    transform: translateX(-50%);
    `,
    imageSlider__dot:css`background-color: var(--colorBlack);
    width: 15px;
    cursor: pointer;
    height: 15px;
    margin-right: 1rem;
    border-radius: 25px;
    transition: all .5s cubic-bezier(0.075, 0.82, 0.165, 1);
    :hover{
        transform: scale(1.2);
    }
    `
}
export default ProductImages
