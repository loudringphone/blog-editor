import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from 'react-router-dom'
import Edit from '../pages/Edit'
import Login from "../pages/Login";
import Posts from "../pages/Posts";
// import Logout from '../pages/Logout'

// import ProtectedRoute from "./ProtectedRoute";
import useAuth from '../custom-hook/useAuth'


const Routers = (props) => {
    const {pathname} = useLocation();
    const [prevLocation, setPrevLocation] = useState(null);
    const {currentUser} = props
    
    useEffect(() => {
        if (pathname !== '/account/login') {
            setPrevLocation(pathname);
        }
      }, [pathname]);

    return (
        <Routes>
            <Route path='/' element={<Posts />} />
            <Route path='posts' element={<Posts />} />
            <Route path='edit' element={<Edit />} />
            {/* <Route path='checkouts' element={
                <ProtectedRoute>
                    <Checkout currentUser={currentUser} />
                </ProtectedRoute>}
            /> */}
            <Route path='account/login' element={<Login prevLocation={prevLocation} />} />
           
            {/* <Route path='account' element={<MyAccount currentUser={currentUser} />} />
            <Route path='account/logout' element={<Logout/>} /> */}
        </Routes>
    )
};

export default Routers;

