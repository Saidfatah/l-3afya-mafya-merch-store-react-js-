import React ,{useContext,useState,createRef,forwardRef,useImperativeHandle}from 'react'
import {Link} from "react-router-dom";
import {MyContext} from '../../Context/ProductsProvider'
import Products from '../Products/Products'
const  SearchModal = forwardRef((props,ref)=> {
    const searchModalRef = createRef()
    const [searchQuery , setSearchQuery]=useState('')
    const [resultsCount , setResultsCount]=useState('')
    const [results , setResults]=useState([])
    const [maxDisplay , setMaxDisplay]=useState('')
    const {getProductsByString} =useContext(MyContext)


    useImperativeHandle(ref, () => ({
        fadeIn(){
            searchModalRef.current.style.display='block'
            searchModalRef.current.style.opacity='1'
        }
    }));
    const fadeOut=e=>{
            searchModalRef.current.style.display='none'
            searchModalRef.current.style.opacity='0'
    }
    const search = e=>{
         setSearchQuery(e.target.value)
         setResults(getProductsByString(e.target.value))
         setResultsCount(results.lenght)
    }
    return (
        <div ref={searchModalRef} className="resultsModal">
            
            <div className="resultsModal__top">
                    <input  placeholder="Search..." onChange={search}/>
                    <i className="far fa-times-circle Close" onClick={fadeOut}></i>
                </div>
            <div className="resultsModal_results">
                <div className="results__info">
                     <h2><span>{10}</span> results </h2>
                     <Link className="raw__Link " to={"/search/"+searchQuery}>View all</Link>
                </div>
                <div className="results__results">
                   <Products productsFromSearch={results} maxDisplay={maxDisplay}/>
                </div>
            </div>
        </div>
    )
})

export default SearchModal
