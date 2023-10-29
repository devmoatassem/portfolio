import React from 'react';
import { BrowserRouter, Route , Routes} from 'react-router-dom';
import About from './components/about/About.jsx';
import Navbar from './components/Navbar.jsx';
import Home from './components/home/Home.jsx';
import Portfolio from './components/portfolio/Portfolio.jsx';
import Education from './components/education/Education.jsx';

function App(){
  return(
    <BrowserRouter>
    < Navbar />
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/home" element={<Home/>} />
        <Route exact path="/about" element={<About/>} />
        <Route exact path="/portfolio" element={<Portfolio/>} />
        <Route exact path="/education" element={<Education/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;