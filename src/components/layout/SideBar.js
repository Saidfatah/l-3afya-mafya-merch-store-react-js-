import React ,{createRef}from 'react'

function SideBar() {
    const sideBarContainer = createRef()
    const pageShdowCover = createRef()
    const slideOut=e=>{
        sideBarContainer.current.style.right='-400px'
        pageShdowCover.current.style.opacity='0'
        setTimeout(()=>pageShdowCover.current.style.display='none', 600);
    }
    return (
        <div>
            <div className="pageShdowCover" ref={pageShdowCover}></div>
            <div className="SideContainer sideBar" ref={sideBarContainer}>
            
                    <i class="far fa-times-circle" onClick={slideOut}></i>
             
                <div className="cart__bottom">  
                    <div className="social">
                           <a href="https://twitter.com/home"><i className="fab fa-twitter"></i></a>
                           <a href="https://www.facebook.com/"><i className="fab fa-facebook-f"></i></a>
                           <a href="https://www.instagram.com/"><i className="fab fa-instagram"></i></a>
                           <a href="https://www.youtube.com/"><i className="fab fa-youtube"></i></a>
                    </div>
                </div>
        </div>
        </div>
    )
}

export default SideBar
