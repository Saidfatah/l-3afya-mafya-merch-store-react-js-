import React from 'react'
import Products from '../Products/Products'
function Home() {
    return (
        <div className="Home">
            <div className="hero">
                <img   src={process.env.REACT_APP_PUBLIC_URL+'/images/HeroImages/HeroImage.png'}/>
            </div>
            {/* <Products /> */}
        </div>
    )
}

export default Home
