
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Startpage from './pages/Startpage';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import Viewpdf from './pages/Viewpdf';
import Pagenotfound from './pages/Pagenotfound';


function App() {
  return (

    <div >
     

   
       {/* Routes hold all the routes */}
       <Routes>
        {/* Route for all the pages */}
        <Route path='/' element={<Startpage/>}/>
        <Route path='register' element={<Register/>}/>
        <Route path='login' element={<Login/>}/>
        <Route path='home/:userId' element={<Home/>}/>
        <Route path='viewpdf/:userId/:pdfName' element={<Viewpdf/>}/>
        <Route path='*' element={<Pagenotfound/>}/>
      </Routes>
     
    </div>
  );
}

export default App;
