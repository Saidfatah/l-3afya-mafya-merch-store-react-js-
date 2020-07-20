import React ,{createRef,forwardRef,useImperativeHandle}from 'react'

const  SearchModal = forwardRef((props,ref)=> {
    const cartContainer = createRef()
    const pageShdowCover = createRef()

    const search = e=>{

    }
    return (
        <div className="resultsModal">
            <input  placeholder="Search..." onChange={search}/>

            <div className="results">
                <div className="results__info"></div>
                <div className="results__results"></div>
            </div>
        </div>
    )
})

export default SearchModal
