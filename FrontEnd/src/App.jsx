import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './component/AccoutPages/Login'
import Signup from './component/AccoutPages/Signup'
import ForgetPassword from './component/AccoutPages/ForgetPassword'
import HomePage from './component/MainPages/HomePage'
import About from './component/MainPages/About'
import Contact from './component/MainPages/Contact'
import ProfilrPage from './component/MainPages/ProfilePage'
import DeleteAccount from './component/AccoutPages/DeleteAccount'
import CreateStore from './component/MainPages/CreateStore'
import Store from './component/MainPages/Store'
import DeleteStore from './component/MainPages/DeleteStore'
import StoreDetail from './component/MainPages/StoreDetail'
import AddProducts from './component/MainPages/AddProducts'
import ViewDetail from './component/MainPages/ViewDetail'
import PlaceOrder from './component/MainPages/PlaceOrder'
import DeleteAllProducts from './component/MainPages/DeleteAllProducts'
import MyOrder from './component/MainPages/MyOrder'
import AddtoCart from './component/MainPages/AddtoCart'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Signup" element={<Signup />} />j
        <Route path="/login" element={<Login />} />
        <Route path="/forget" element={<ForgetPassword />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<ProfilrPage />} />
        <Route path="/deleteAccount" element={<DeleteAccount />} />
        <Route path="/createstore" element={<CreateStore />} />
        <Route path="/store" element={<Store />} />
        <Route path="/deletestore" element={<DeleteStore />} />
        <Route path="/storedetail" element={<StoreDetail />} />
        <Route path="/addproduct" element={<AddProducts />} />
        <Route path="/viewdetail/:id" element={<ViewDetail />} />
        <Route path="/placeorder/:ProductId" element={<PlaceOrder />} />
        <Route path="/placeorder" element={<PlaceOrder />} />
        <Route path="deleteallproducts" element={<DeleteAllProducts />} />
        <Route path="/myorder" element={<MyOrder />} />
        <Route path="/addtocart" element={<AddtoCart />} />
      </Routes>
    </Router>
  )
}

export default App
