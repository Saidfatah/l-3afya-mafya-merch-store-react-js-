import React,{useRef,useState,useEffect} from 'react'
import { BrowserRouter as Router,Switch,Route} from "react-router-dom"
import '../Style/App.css'
import Navbar from './layout/Navbar'
import Footer from './layout/Footer'
import Contact from './routes/info/Contact'
import PrivacyPolicy from './routes/info/PrivacyPolicy'
import Search from './routes/Search'
import CheckOut from './routes/checkout/CheckOut'
import Shop from './routes/Shop'
import Account from './routes/Account/Account'
import Adresses from './routes/Account/customer/Adresses'
import CreateProduct from './routes/protectedRoutes/CreateProduct'
import Home from './routes/Home'
import SearchModal from './Products/SearchModal'
import ProductPage from './Products/ProductPage/ProductPage'
import Collections from './routes/collections/Collections'
import CollectionPage from './routes/collections/CollectionPage'
import CreateCollection from './routes/collections/CreateCollection'
import SideBar from './layout/SideBar'
import Cart from './cart/SideBarCart'
import ScrollToTop from './utils/ScrollToTop'
import Provider from '../Context/ProductsProvider'
import CartProvider from '../Context/CartProvider'
import CollectionsProvider from '../Context/CollectionsProvider'
/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import {Elements} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js'

const stripePromise = loadStripe('pk_test_51HCsVhLkAIHmcekiVfb5aSOF75eJPLKwn7MhbxmQKMVtJrworoCsyNL8Otxs0cdcFYjKMpjejHzChey00DlIkW8b007nxn9KYC')

const App=()=> {
  console.log(process.env.REACT_APP_PUBLIC_URL2)
  return (
    <div className="App">
      <Elements stripe={stripePromise} >
       <Provider>
          <CartProvider>
            <CollectionsProvider>
            <Router>
              {
              //in some pages I don't want the navbar to apper as in checkout page  
                window.location.href.indexOf("/checkout") == -1
                ?<React.Fragment>
                      <Cart />
                      <SideBar />
                      <div css={css`margin-bottom:74px;`}></div>
                      <Navbar />
                      <SearchModal /> 
                  </React.Fragment>
                :null
              }
                
                <ScrollToTop/>
                <Switch>      
                   <Route exact path="/"><Home /></Route>

                   <Route exact path="/collections"> <Collections /></Route>
                   <Route path="/collections/:collectionTitle"><CollectionPage /></Route>
                   <Route path="/collectioncreation"><CreateCollection /></Route>

                   <Route path="/contact/register"><Contact register={true} /></Route>
                   <Route path="/shop"><Shop /></Route>
                   <Route path="/product/create"><CreateProduct /></Route>
                   <Route path="/product/:id"><ProductPage  /></Route>
                   <Route exact path="/search"><Search  hasPram={true}/></Route>
                   <Route path="/search/:query"><Search hasPram={false}/></Route>
                   <Route  path="/checkout"><CheckOut /></Route>

                   <Route path="/policy"><PrivacyPolicy /></Route>
                   <Route path="/contact"><Contact  register={false}/></Route>

                   <Route path="/account"><Account /></Route>
                   <Route path="/addresses"><Adresses /></Route>
                </Switch>
                <Footer/>
            </Router>  
            </CollectionsProvider> 
          </CartProvider>
       </Provider>
      </Elements>
    </div>
  );
}

export default App;
