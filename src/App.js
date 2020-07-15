import React from 'react';
import './Style/App.css';
import './Style/layoutStyles/hero.css';
import './Style/layoutStyles/navbar.css';
import './Style/layoutStyles/footer.css';


import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Contact from './components/layout/Contact'
import Hero from './components/layout/Hero'
import SideBar from './components/layout/SideBar'


function App() {
  return (
    <div className="App">
        <Navbar/>
        <Hero/>
        <Footer/>
    </div>
  );
}

export default App;
