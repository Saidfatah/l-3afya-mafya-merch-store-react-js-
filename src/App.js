import React from 'react';
import './Style/App.css';
import './Style/layoutStyles/hero.css';
import './Style/layoutStyles/navbar.css';
import './Style/layoutStyles/footer.css';
import './Style/routes/Home.css';
import './Style/routes/search.css';
import './Style/products/product.css';
import './Style/products/products.css';
import './Style/buttons.css';
import './Style/cart/cart.css';

import { BrowserRouter as Router,Switch,Route} from "react-router-dom";
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Contact from './components/routes/Contact'
import PrivacyPolicy from './components/routes/PrivacyPolicy'
import Search from './components/routes/Search'
import Shop from './components/routes/Shop'
import Account from './components/routes/Account'
import Home from './components/routes/Home'
import Collections from './components/routes/Collections'
import SideBar from './components/layout/SideBar'
import SideBarCart from './components/cart/SideBarCart'
import Provider from './Context/ProductsProvider'

function App() {
  return (
    <div className="App">
       <Router>
          {/* <SideBarCart/> */}
          <SideBar/>
          <Navbar/>
          <Switch>
            <Provider>
               <Route exact path="/"> <Home /></Route>
               <Route path="/collections"><Collections /></Route>
               <Route path="/contact"><Contact /></Route>
               <Route path="/shop">   <Shop /></Route>
               <Route path="/policy"> <PrivacyPolicy /></Route>
               <Route path="/account"><Account /></Route>
               <Route path="/search"> <Search /></Route>
            </Provider>
          </Switch>
          <Footer/>
       </Router>  
    </div>
  );
}

export default App;
