import React,{useEffect,createRef,useContext,useState} from 'react'
import {MyContext} from '../../../Context/ProductsProvider'
function ProductImages(props) {
    const {title}=props
    const img1 = createRef()
    const img2 = createRef()
    const img1Container = createRef()
    const img2Container = createRef()
    const [firstsActive,setFirstsActive]=useState(true)
    const {getImage} =useContext(MyContext)
    useEffect(() => {
        getImage(title,setImage(img1),1)
        getImage(title,setImage(img2),2)
        console.log(img1Container.current);
    }, [])
    const setImage=(img)=>(res)=>{
        const blob = new Blob([res.data],{type:res.headers['content-type']});
        const objectURL = URL.createObjectURL(blob);
        if (img.current != null)img.current.src = objectURL
    }
    const slideImage=e=>{
        img1Container.current.style.opacity= firstsActive? '0':'1'
        img2Container.current.style.opacity=firstsActive? '1':'0'
        setFirstsActive(!firstsActive)
    }
    return (
        <div  className="product_images">
                <div className="imageSlider">
                     <div ref={img1Container} className="imageSlider__image">
                         <img ref={img1}  src=""alt="loading ..."/>
                     </div>
                     <div ref={img2Container} className="imageSlider__image">
                         <img ref={img2}src="" alt="loading ..."/>
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
