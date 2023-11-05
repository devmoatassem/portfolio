import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import About from './components/about/About.jsx';
import Navbar from './components/common/navbar/Navbar.jsx';
import Home from './components/home/Home.jsx';
import Portfolio from './components/portfolio/Portfolio.jsx';
import Education from './components/education/Education.jsx';
import Footer from './components/common/Footer.jsx';
import Front from './components/common/Front.jsx';
import { AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
function Content() {
    const location = useLocation();


  return (
    <>
      {/* <Front />    */}
      < Navbar />
      <AnimatePresence mode='wait'>
        <Routes location={location} key={location.pathname}>
          <Route exact path='/'>
            {/* <Route index element={<Navigate to="/" replace />} /> */}
            <Route exact path="/" element={<Home />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/portfolio" element={<Portfolio />} />
            <Route exact path="/education" element={<Education />} />
            <Route exact path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </AnimatePresence>
      <Footer />
    </>
  )
}
export default Content;