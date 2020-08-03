import React,{useContext ,useEffect,useState,createRef} from 'react'
import {Link} from "react-router-dom"
import {MyContext} from '../../Context/ProductsProvider'
import {CollectionsContext} from '../../Context/CollectionsProvider'
import {ImagesContext} from '../../Context/ImagesProvder'
function Collections() {
    const [imageSrc1,setimageSrc1]=useState('')
    const [imageSrc2,setimageSrc2]=useState('')
    const [imageSrc3,setimageSrc3]=useState('')
    const [collectionsList,setCollectionsList]=useState([])
    const {getProductById} =useContext(MyContext)
    const {collections} =useContext(CollectionsContext)
    const {getImage} =useContext(ImagesContext)
    useEffect(() => {
        if(collections.length >0)
        {
            console.log(collections)
            getProductById(collections[0].products[1]).then(res=>{
                getImage(res.data.title).then(src=>{
                   setimageSrc1('/images/products/'+res.data.title+'/img1.'+src.data)
                })
            })
            getProductById(collections[1].products[3]).then(res=>{
                getImage(res.data.title).then(src=>{
                   setimageSrc2('/images/products/'+res.data.title+'/img1.'+src.data)
                })
            })
            getProductById(collections[2].products[0]).then(res=>{
                getImage(res.data.title).then(src=>{
                   setimageSrc3('/images/products/'+res.data.title+'/img1.'+src.data)
                })
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
