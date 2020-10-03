import React,{useRef,useState,useEffect} from 'react'
import { BrowserRouter as Router,Switch,Route} from "react-router-dom"
import '../Style/GlobalStyles.css'
import Navbar from './layout/Navbar'
import Footer from './layout/Footer'
import Contact from './routes/Contact'
import PrivacyPolicy from './routes/PrivacyPolicy'
import Search from './routes/Search'
import CheckOut from './routes/checkout/CheckOut'
import Shop from './routes/Shop'
import Account from './routes/Account/Account'
import CreateProduct from './routes/protectedRoutes/CreateProduct'
import Home from './routes/Home'
import SearchModal from './Products/SearchModal'
import ProductPage from './Products/ProductPage/ProductPage'
import Collections from './routes/Collections'
import CollectionPage from './routes/CollectionPage'
import SideBar from './layout/SideBar'
import SideBarCart from './cart/SideBarCart'
import ScrollToTop from './utils/ScrollToTop'
import Provider from '../Context/ProductsProvider'
import CartProvider from '../Context/CartProvider'
import CollectionsProvider from '../Context/CollectionsProvider'

const App=()=> {
  const SideBarRef = useRef();
  const NavbarRef = useRef();
  const SearchModalRef = useRef();
  const [slideNow,setSlideNow]=useState(false)
  const [displaySearchModal,setDisplaySearchModal]=useState(false)
  const setSlideNowFun=(slide)=>{setSlideNow(slide)}
  const setDisplaySearchModalFun=(display)=>{setDisplaySearchModal(display)}


  useEffect(() => {
    if( NavbarRef.current != undefined) NavbarRef.current.slideSideBarIn = SideBarRef.current.slideIn
  }, [ NavbarRef.current])

  return (
    <div className="App">
       <Provider>
          <CartProvider>
            <CollectionsProvider>
            <Router>
              {
              //in some pages I don't want the navbar to apper as in checkout page  
              window.location.href.indexOf("/checkout") == -1?
                    <React.Fragment>
                        <SideBarCart setSlideNow={setSlideNowFun} slideNow={slideNow} />
                        <SideBar ref={SideBarRef} />
                        <div className="offsetNavbar"></div>
                        <Navbar ref={NavbarRef}  setSlideNow={setSlideNowFun}  setDisplaySearchModal={setDisplaySearchModalFun}/>
                        <SearchModal  ref={SearchModalRef}  display={displaySearchModal}  setDisplaySearchModal={setDisplaySearchModalFun}/> 
                    </React.Fragment>
                  :null
              }
                
                <ScrollToTop/>
                <Switch>      
                   <Route exact path="/"><Home /></Route>
                   <Route exact path="/collections"> <Collections /></Route>
                   <Route path="/collections/:collectionTitle"><CollectionPage /></Route>
                   <Route path="/contact"><Contact  register={false}/></Route>
                   <Route path="/contact/register"><Contact register={true} /></Route>
                   <Route path="/shop"><Shop /></Route>
                   <Route path="/product/create"><CreateProduct /></Route>
                   <Route path="/policy"><PrivacyPolicy /></Route>
                   <Route path="/account"><Account /></Route>
                   <Route path="/product/:id"><ProductPage /></Route>
                   <Route exact path="/search"><Search  hasPram={true}/></Route>
                   <Route path="/search/:query"><Search hasPram={false}/></Route>
                   <Route  path="/checkout"><CheckOut /></Route>
                </Switch>
                <Footer/>
            </Router>  
            </CollectionsProvider> 
          </CartProvider>
       </Provider>
    </div>
  );
}

export default App;
