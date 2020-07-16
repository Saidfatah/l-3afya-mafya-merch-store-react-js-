import React from 'react'

function Search() {
    return (
        <div className="flexHorizontalCenter">
            <h2 className="textCenter">Search</h2>
             <p className="textCenter">Enter a word to search our products:</p>
            <input type="text" onKeyUp={(e)=>{
                console.log(e)
            }}  
             placeholder="Search..."
             />
        </div>
    )
}

export default Search
