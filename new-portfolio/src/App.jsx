import { useEffect, useState } from 'react';

// import Splash from './components/common/splash/Splash';
import Front from './components/common/Front';
import Content from './Content';
function App() {
  
  // const [isloading, setIsLoading] = useState(true);
  // useEffect(() => {
  //   setTimeout(() => {
  //     setIsLoading(false);
  //   }, 5000);
  // }, []);
  const [showComponent, setShowComponent] = useState(true);

  useEffect(() => {
    // Use a setTimeout to hide the component after a specified duration
    const timeout = setTimeout(() => {
      setShowComponent(false);
    }, 3000);

    // Clean up the timeout to prevent memory leaks
    return () => {
      clearTimeout(timeout);
    };
  }, [3000]);


  return (
    <>
    {showComponent ? <Front /> : <Content />}
    
    </>
    
    

  )
}

export default App;