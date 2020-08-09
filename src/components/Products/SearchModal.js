import React ,{useContext,useState,createRef,useEffect}from 'react'
import {Link} from "react-router-dom";
import {MyContext} from '../../Context/ProductsProvider'
import Products from '../Products/Products'
import {getParentRecursive} from '../utils/funcs1'
function  SearchModal(props) {
    const searchModalRef = createRef()
    const [searchQuery , setSearchQuery]=useState('')
    const [resultsCount , setResultsCount]=useState(0)
    const [results , setResults]=useState([])
    const {getProducts,setSearchResult} =useContext(MyContext)
    const {display,setDisplaySearchModal}=props
    const fadeIn=()=>{
        if(searchModalRef.current)
        { 
          searchModalRef.current.style.display='block'
          searchModalRef.current.style.opacity='1'
          searchModalRef.current.style.top=window.scrollY +'px'
        }
    }
    const fadeOut=e=>{
         searchModalRef.current.style.display='none'
         searchModalRef.current.style.opacity='0'
         document.body.style.overflowY="scroll" 

    }
    const fadeOutFunc=e=>{
        fadeOut();
        setDisplaySearchModal(false)
        setResults([])
        setSearchResult('')
        setResultsCount(0)
    }
    useEffect(()=>{
        if(display == true)fadeIn()
    },[display])

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
        <div ref={searchModalRef} className="resultsModal">
            
            <div className="resultsModal__top">
                    <input  placeholder="Search..." onChange={search}/>
                    <i className="far fa-times-circle Close" onClick={fadeOutFunc}></i>
                </div>
            <div className="resultsModal_results">
                <div className="results__info">
                     <h2><span>{resultsCount||0}</span> results </h2>
                     {resultsCount>5? <Link className="raw__Link" to={"/search/"+searchQuery} onClick={fadeOutFunc} >View all</Link>:null}
                </div>
                <div className="results__results" onClick={e=>{if(getParentRecursive(e.target,'card'))fadeOutFunc(e)}}>
                   <Products productsFromSearch={results} productSize="small" maxDisplay={resultsCount>=5?5:-1}/>
                </div>
            </div>
        </div>
    )
}
export default SearchModal
