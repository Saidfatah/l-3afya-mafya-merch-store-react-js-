import React,{useRef,useState,useEffect} from 'react';
import './Style/App.css';
import './Style/cart.css';
import './Style/layoutStyles/hero.css';
import './Style/layoutStyles/navbar.css';
import './Style/layoutStyles/footer.css';
import './Style/account/order.css';
import './Style/account/account.css';
import './Style/routes/Home.css';
import './Style/routes/search.css';
import './Style/routes/collection.css';
import './Style/routes/collectionPage.css';
import './Style/products/productPage.css';
import './Style/products/recentlyVisited.css';
import './Style/products/product.css';
import './Style/products/resultsModal.css';
import './Style/products/products.css';
import './Style/buttons.css';
import './Style/products/createProductForm.css';
import './Style/SideContainer.css';
import { BrowserRouter as Router,Switch,Route} from "react-router-dom";
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Contact from './components/routes/Contact'
import PrivacyPolicy from './components/routes/PrivacyPolicy'
import Search from './components/routes/Search'
import Shop from './components/routes/Shop'
import Account from './components/routes/Account/Account'
import CreateProduct from './components/routes/protectedRoutes/CreateProduct'
import Home from './components/routes/Home'
import SearchModal from './components/Products/SearchModal'
import ProductPage from './components/Products/ProductPage/ProductPage'
import Collections from './components/routes/Collections'
import CollectionPage from './components/routes/CollectionPage'
import SideBar from './components/layout/SideBar'
import SideBarCart from './components/cart/SideBarCart'
import Provider from './Context/ProductsProvider'
import CartProvider from './Context/CartProvider'
import CollectionsProvider from './Context/CollectionsProvider'

function App() {

  const SideBarRef = useRef();
  const NavbarRef = useRef();
  const SearchModalRef = useRef();
   const [slideNow,setSlideNow]=useState(false)
   const setSlideNowFun=(slide)=>{setSlideNow(slide)}
   
  useEffect(() => {
    NavbarRef.current.slideSideBarIn = SideBarRef.current.slideIn
    NavbarRef.current.fadeIn = SearchModalRef.current.fadeIn
  }, [ NavbarRef.current])

  return (
    <div className="App">
         <Provider>
            <CartProvider>
            <CollectionsProvider>
            <Router>
               <SideBarCart setSlideNow={setSlideNowFun} slideNow={slideNow} />
               <SideBar ref={SideBarRef} />
               <div className="offsetNavbar"></div>
               <Navbar ref={NavbarRef} setSlideNow={setSlideNowFun} />
               <SearchModal ref={SearchModalRef} /> 
               <Switch>      
                  <Route exact path="/"> <Home /> </Route>
                  <Route exact path="/collections">  <Collections /></Route>
                  <Route path="/collections/:collectionTitle"><CollectionPage /> </Route>
                  <Route path="/contact"><Contact  register={false}/>         </Route>
                  <Route path="/contact/register"><Contact register={true} /> </Route>
                  <Route path="/shop">   <Shop />            </Route>
                  <Route path="/product/create"> <CreateProduct />   </Route>
                  <Route path="/policy"> <PrivacyPolicy />   </Route>
                  <Route path="/account"><Account />         </Route>
                  <Route path="/product/:id"> <ProductPage /></Route>
                  <Route path="/search"> <Search />          </Route>
          
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
