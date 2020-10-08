import React ,{useContext,useState,createRef,useEffect}from 'react'
import {Link} from "react-router-dom";
import {MyContext} from '../../Context/ProductsProvider'
import Products from '../Products/Products'
import {getParentRecursive} from '../utils/funcs1'
/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import {Modal} from '../../Style/global'

const  SearchModal = (props)=> {
    const searchModalRef = createRef()
    const [searchQuery , setSearchQuery]=useState('')
    const [resultsCount , setResultsCount]=useState(0)
    const [results , setResults]=useState([])
    const {getProducts,setSearchResult} =useContext(MyContext)
    const {display,setDisplaySearchModal}=props


    const fadeIn=()=>{
        if(searchModalRef.current)
        { 
          searchModalRef.current.style.transition="none"
          searchModalRef.current.style.display='block'
          searchModalRef.current.style.top=window.scrollY +'px'
          setTimeout(() => {
            if(searchModalRef.current == null ) return
            searchModalRef.current.style.transition="all .3s cubic-bezier(0.55, 0.085, 0.68, 0.53)"
          searchModalRef.current.style.opacity='1'

        }, 100);
        }
    }
  

    useEffect(()=>{
        if(display == true)fadeIn()
    },[display])

   const fadeOut=e=>{
       searchModalRef.current.style.display='none'
       searchModalRef.current.style.opacity='0'
       document.body.style.overflowY="scroll" 

   }
   const fadeOutFunc=e=>{
       fadeOut();
       setDisplaySearchModal(false)
       setResults([])
       
       if(results.length>0)
             setSearchResult([...results])
       else  setSearchResult([])

       setResultsCount(0)
   }
    const search = e=>{
        setSearchQuery(e.target.value)
        getProducts().then(res=>{
            const fecthedProducts = res.data
            const resultsFiltered = fecthedProducts.filter(p=>p.title.includes(searchQuery))
            setSearchResult(resultsFiltered)
            setResults(resultsFiltered)
            setResultsCount(resultsFiltered.length)
        })
   }
  
    return (
        <Modal ref={searchModalRef} 
        height="100%" 
        width="100%" 
        left={0}  
        display="none" 
        opacity={0} 
        overflowY="scroll" 
        >      
            <div css={styles.resultsModal__top}>
                    <input  placeholder="Search..." onChange={search}/>
                    <i className="far fa-times-circle Close" onClick={fadeOutFunc}></i>
            </div>
            <div  css={styles.resultsModal_results}>
                <div  css={styles.results__info}>
                     <h2><span>{resultsCount||0}</span> results </h2>
                     {
                         resultsCount>5
                         ? <Link className="raw__Link" to={"/search/"+searchQuery} onClick={fadeOutFunc} >View all</Link>
                         :null
                     }
                </div>
                <div  onClick={e=>{if(getParentRecursive(e.target,'card'))fadeOutFunc(e)}}>
                   <Products productsFromSearch={results} productSize="small" maxDisplay={resultsCount>=5?5:-1}/>
                </div>
            </div>
        </Modal>
    )
}


const styles ={
    resultsModal__top :css` 
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
    padding: 1rem;
    input{
        text-align: left;
        padding-left: 0;
        width: 100%;
        line-height: normal;
        color: var(--colorGreyLight);
        margin-left: 1rem;
        font-size: 18px;
        font-family: go;
    }
    input:focus{
        outline: none;
    }
    `,
    resultsModal_results :css` 
    padding: 0 2rem;
    `,
    results__info :css` 
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding-bottom: 1rem;
    align-items: center;
    border-bottom: 1px solid var(--colorGreyFaint);
    h2{
        font-size: .8rem;
    }
    `,

}
export default SearchModal
