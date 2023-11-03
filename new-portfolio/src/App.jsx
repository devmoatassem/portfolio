import React from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import About from './components/about/About.jsx';
import Navbar from './components/common/navbar/Navbar.jsx';
import Home from './components/home/Home.jsx';
import Portfolio from './components/portfolio/Portfolio.jsx';
import Education from './components/education/Education.jsx';
import Footer from './components/common/Footer.jsx';
import { AnimatePresence } from 'framer-motion';
function App() {
  const location = useLocation();
 
  return (
    <>
    < Navbar />
      <AnimatePresence mode='wait'>
        
        <Routes location={location} key={location.pathname}>
          
          <Route exact path='/'>
            <Route index element={<Navigate to="/home" replace />} />
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/portfolio" element={<Portfolio />} />
            <Route exact path="/education" element={<Education />} />
          </Route>

        </Routes>
        
      </AnimatePresence>
      <Footer />
    </>

  )
}

export default App;