import React,{useEffect,createRef,useContext,useState} from 'react'
import {MyContext} from '../../../Context/ProductsProvider'
import {ImagesContext} from '../../../Context/ImagesProvder'
function ProductImages(props) {
    const {id}=props
    const img1Container = createRef()
    const img2Container = createRef()
    const [firstsActive,setFirstsActive]=useState(true)
    const [imageSrc1,setimageSrc1]=useState('')
    const [imageSrc2,setimageSrc2]=useState('')
    const {getProductById} =useContext(MyContext)
    const {getImage} =useContext(ImagesContext)

    useEffect(() => {
             getProductById(id).then(res=>{
                 getImage(res.title).then(src=>{
                    setimageSrc1('/images/products/'+res.title+'/img1.'+src.data)
                    setimageSrc2('/images/products/'+res.title+'/img2.'+src.data)
                 })
             })
    }, [])


    const slideImage=e=>{
        img1Container.current.style.opacity= firstsActive? '0':'1'
        img2Container.current.style.opacity=firstsActive? '1':'0'
        setFirstsActive(!firstsActive)
    }
    return (
        <div  className="product_images">
                <div className="imageSlider">
                     <div ref={img1Container} className="imageSlider__image">
                         <img  src={imageSrc1} alt="loading ..."/>
                     </div>
                     <div ref={img2Container}   className="imageSlider__image">
                         <img   src={imageSrc2} alt="loading ..."/>
                     </div>
                     <div className="imageSlider__navigate">
                         <div className="imageSlider__dot" onClick={slideImage}></div>
                         <div className="imageSlider__dot" onClick={slideImage}></div>
                     </div>
                </div>
        </div>
    )
}

export default ProductImages
