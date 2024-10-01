import { useState } from 'react'
import Navbar from './components/navbar/navbar';
import { Route, Routes } from 'react-router-dom';
import Home from "./pages/Home/home";
import Cart from "./pages/Cart/cart";
import PlaceOrder from './pages/Place order/PlaceOrder';
import Verify from './pages/verify/verify.jsx';
import MyOrders from './pages/Myorders/myOrders.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './components/footer/footer';
import LoginPopUp from './components/logInPopUp/loginPopUp';

function App() {
  const [count, setCount] = useState(0)
  const [showLogin, setShowLogin] =useState(false)

  return (
    <>
    {showLogin ? <LoginPopUp setShowLogin={setShowLogin}/>   : <></>}
    <div className='app'>
    <ToastContainer/>
      <Navbar setShowLogin={setShowLogin}/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/order" element={<PlaceOrder/>}/>
        <Route path="/verify" element={<Verify/>} />
        <Route path="/myorders" element={<MyOrders/>} />
      </Routes>
      <Footer/>
    </div>
    </>
  )
}

export default App
