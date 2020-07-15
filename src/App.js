import React from 'react';
import './Style/App.css';
import './Style/layoutStyles/hero.css';
import './Style/layoutStyles/navbar.css';
import './Style/layoutStyles/footer.css';
import { BrowserRouter as Router,Switch,Route} from "react-router-dom";
import Navbar from './components/layout/Navbar'
import Contact from './components/routes/Contact'
import Shop from './components/routes/Shop'
import Account from './components/routes/Account'
import Home from './components/routes/Home'
import Collections from './components/routes/Collections'
import SideBar from './components/layout/SideBar'


function App() {
  return (
    <div className="App">
       <Router>
          <Navbar/>
          <Switch>
              <Route exact path="/"> <Home /></Route>
              <Route path="/account"><Account /></Route>
              <Route path="/collections"><Collections /></Route>
              <Route path="/contact"><Contact /></Route>
              <Route path="/shop">   <Shop /></Route>
          </Switch>
       </Router>  
    </div>
  );
}

export default App;
