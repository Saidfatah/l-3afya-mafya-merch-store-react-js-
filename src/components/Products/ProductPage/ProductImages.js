import React,{useEffect,createRef,useContext,useState} from 'react'
import {MyContext} from '../../../Context/ProductsProvider'
function ProductImages(props) {
    const {id}=props
    const img1 = createRef()
    const img2 = createRef()
    const img1Container = createRef()
    const img2Container = createRef()
    const [firstsActive,setFirstsActive]=useState(true)
    const {getImage,getProductById} =useContext(MyContext)

    useEffect(() => {
       
        getProductById(id).then(res=>{
             getImage(res.title,setImage(1),1)
             getImage(res.title,setImage(2),2)
        })
    }, [])

    const setImage=(img)=>(res)=>{
        img == 1 ? img1.current.src =res : img2.current.src =res
};
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
                         <img ref={img2}  src="" alt="loading ..."/>
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
