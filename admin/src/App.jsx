import React from 'react'
import Navbar from './components/navbar/navbar.jsx';
import Sidebar from "./components/sidebar/sidebar.jsx";
import { Routes, Route } from 'react-router-dom';
import Add from './pages/add/add.jsx';
import List from './pages/list/list.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Order from './pages/order/order.jsx';

const App = () => {

  const url = "http://localhost:4000";
  return (
    <div>
      <ToastContainer/>
      <Navbar/>
      <hr/>
      <div className="app-content">
        <Sidebar/>
        <Routes>
          <Route path="/add" element={<Add url={url}/>}/>
          <Route path="/list" element={<List url={url}/>}/>
          <Route path="/order" element={<Order url={url}/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App
