import React from 'react'
import Products from '../Products/Products'
import heroImage from '../../Images/HeroImages/HeroImage.png'
function Home() {
    return (
        <div className="Home">
            <div className="hero">
                <img   src={heroImage}/>
            </div>
            {/* <Products /> */}
        </div>
    )
}

export default Home
