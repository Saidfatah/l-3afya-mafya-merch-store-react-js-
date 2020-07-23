import React,{useContext ,useEffect,createRef} from 'react'
import {Link} from "react-router-dom"
import {MyContext} from '../../Context/ProductsProvider'
function Collections() {
    const img1 = createRef()
    const img2 = createRef()
    const img3 = createRef()
    const {collections,getProductById,getImage} =useContext(MyContext)
    useEffect(() => {
        const title1 = getProductById(collections[0].products[1]).title
        const title2 = getProductById(collections[1].products[3]).title
        const title3 = getProductById(collections[2].products[0]).title
        console.log(title1)
        getImage(title1,setImage(img1),1)
        getImage(title2,setImage(img2),1)
        getImage(title3,setImage(img3),1)
    }, [])

    const setImage=(img)=>(res)=>{
        img.current.onerror = ()=> {
              img.current.src =res.split('.png')[0]+'.jpg'
        }
        if (img.current != null)img.current.src =res
    };
    return (
        <div className="collections">
            <h1>All collections</h1>
            <div className="collections__wrapper">
                <div className="collections__collection">
                    <div className="collection__info">
                        <h2>{collections[0].title}</h2>
                        <Link to={"/collections/"+collections[0].title} className="btn">VIEW PRODUCTS</Link>
                    </div>
                    <img ref={img1}  src=""alt="loading ..."/>
                </div>  
                <div className="collections__collection">
                     <div className="collection__info">
                        <h2>{collections[1].title}</h2>
                        <Link to={"/collections/"+collections[1].title} className="btn">VIEW PRODUCTS</Link>
                    </div>
                    <img ref={img2}  src=""alt="loading ..."/>
                </div>  
                <div className="collections__collection">
                    <div className="collection__info">
                        <h2>{collections[2].title}</h2>
                        <Link to={"/collections/"+collections[2].title} className="btn">VIEW PRODUCTS</Link>
                    </div>
                    <img ref={img3}  src=""alt="loading ..."/>
                </div>  
            </div>
        </div>
    )
}

export default Collections
