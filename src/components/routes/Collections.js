import React,{useContext ,useEffect,useState,createRef} from 'react'
import {Link} from "react-router-dom"
import {MyContext} from '../../Context/ProductsProvider'
import {CollectionsContext} from '../../Context/CollectionsProvider'
/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import {Button} from './../../Style/global'


const Collections=()=> {
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
        <div  css={styles.collections}>
            <h1>All collections</h1>
            {
                collections.length >0 
                ? <div css={styles.collections__wrapper}>
                     <div  css={styles.collections__collection}>
                         <div  css={styles.collection__info}>
                             <h2>{collections[0].title }</h2>
                             <Link to={"/collections/"+collections[0].title } className="btn">
                                 <Button collection={true} > VIEW PRODUCTS </Button>
                             </Link>
                         </div>
                         <img   src={imageSrc1} alt="loading ..."/>
                     </div>  
                     <div  css={styles.collections__collection}>
                          <div  css={styles.collection__info}>
                             <h2>{collections[1].title }</h2>
                             <Link to={"/collections/"+collections[1].title } className="btn">
                                  <Button collection={true} > VIEW PRODUCTS </Button>
                             </Link>
                         </div>
                         <img   src={imageSrc2} alt="loading ..."/>
                     </div>  
                     <div  css={styles.collections__collection}>
                         <div  css={styles.collection__info}>
                             <h2>{collections[2].title }</h2>
                             <Link to={"/collections/"+collections[2].title } className="btn">
                                  <Button collection={true} > VIEW PRODUCTS </Button>
                             </Link>
                         </div>
                         <img  src={imageSrc3} alt="loading ..."/>
                     </div> 
                </div>
                 :'no collections'
            }
        </div>
    )
}

const styles ={
    collections :css` 
    margin-top: 8rem;
    min-height: 500px;
    h1{
        margin-bottom: 3rem;
        text-align: center;
        font-size: 22px;
    }
    `,
    collections__wrapper :css` 
    display: flex;
    height:fit-content;
    width: 100%;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 8rem;
    `,
    collections__collection :css` 
    height: 100%;
    width: 395px;
    position: relative;
    margin-right: 2rem;
    background-image: linear-gradient(to top, rgba(4,4,4,0.65), rgba(54,54,54,0.2));
    :after{
        position: absolute;
        content: '';
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        background-image: -webkit-gradient(linear, left bottom, left top, from(rgba(4,4,4,0.65)), to(rgba(54,54,54,0.2))); 
        background-image: linear-gradient(to top, rgba(4,4,4,0.65), rgba(54,54,54,0.2));
    }
    img{
        width: 100%;
    }
    
    `,
    collection__info :css` 
    position: absolute;
    bottom: 50px;
    left: 30px;
    z-index: 99;
    h2{
        color: #fff;
        font-size: 22px;
        margin-bottom: 1rem;
     }
    `,

}


export default Collections
