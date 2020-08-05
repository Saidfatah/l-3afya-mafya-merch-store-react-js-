import React,{useContext ,useEffect,useState,createRef} from 'react'
import {Link} from "react-router-dom"
import {MyContext} from '../../Context/ProductsProvider'
import {CollectionsContext} from '../../Context/CollectionsProvider'
import {ImagesContext} from '../../Context/ImagesProvder'
function Collections() {
    const [imageSrc1,setimageSrc1]=useState('')
    const [imageSrc2,setimageSrc2]=useState('')
    const [imageSrc3,setimageSrc3]=useState('')
    const {getProductById} =useContext(MyContext)
    const {collections} =useContext(CollectionsContext)
    useEffect(() => {
        if(collections.length >0)
        {
            getProductById(collections[0].products[1]).then(res=>{
                   setimageSrc1('/images/products/'+res.data.title+'/'+res.data.images[0])
            })
            getProductById(collections[1].products[3]).then(res=>{
                   setimageSrc2('/images/products/'+res.data.title+'/'+res.data.images[0])
            })
            getProductById(collections[2].products[0]).then(res=>{
                   setimageSrc3('/images/products/'+res.data.title+'/'+res.data.images[0])
            })
        }
    }, [collections])


    return (
        <div className="collections">
            <h1>All collections</h1>
            {
                collections.length >0 ? <div className="collections__wrapper">
                     <div className="collections__collection">
                         <div className="collection__info">
                             <h2>{collections[0].title }</h2>
                             <Link to={"/collections/"+collections[0].title } className="btn">VIEW PRODUCTS</Link>
                         </div>
                         <img   src={imageSrc1} alt="loading ..."/>
                     </div>  
                     <div className="collections__collection">
                          <div className="collection__info">
                             <h2>{collections[1].title }</h2>
                             <Link to={"/collections/"+collections[1].title } className="btn">VIEW PRODUCTS</Link>
                         </div>
                         <img   src={imageSrc2} alt="loading ..."/>
                     </div>  
                     <div className="collections__collection">
                         <div className="collection__info">
                             <h2>{collections[2].title }</h2>
                             <Link to={"/collections/"+collections[2].title } className="btn">VIEW PRODUCTS</Link>
                         </div>
                         <img  src={imageSrc3} alt="loading ..."/>
                     </div> 
                </div>
                 :'no collections'
            }
        </div>
    )
}

export default Collections
