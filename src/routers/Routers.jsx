import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from 'react-router-dom'
import Edit from '../pages/Edit'
import Create from '../pages/Create'
import Login from "../pages/Login";
import Post from "../pages/Post";
import Posts from "../pages/Posts";
import Logout from '../pages/Logout'

import ProtectedRoute from "./ProtectedRoute";


const Routers = ({currentUser, editing}) => {
    const {pathname} = useLocation();
    const [prevLocation, setPrevLocation] = useState(null);
    
    useEffect(() => {
        if (pathname !== '/account/login') {
            setPrevLocation(pathname);
        }
      }, [pathname]);
    return (
        <Routes>
          <Route path='/' element={<Posts currentUser={currentUser} />} />
          <Route path='posts' element={<Posts currentUser={currentUser} />} />
          <Route path='account/login' element={<Login prevLocation={prevLocation} />} />
          <Route path='post/:postId' element={<Post currentUser={currentUser} />} />


          <Route path='edit/:postId' element={
            <ProtectedRoute>
              <Edit currentUser={currentUser} editing={editing} />
            </ProtectedRoute>} />
          <Route path='create' element={
            <ProtectedRoute>
              <Create currentUser={currentUser} />
            </ProtectedRoute>} />
          <Route path='create/:postId' element={
            <ProtectedRoute>
              <Edit currentUser={currentUser} editing={editing} />
            </ProtectedRoute>} />
          <Route path='my-posts' element={
            <ProtectedRoute>
              <Posts currentUser={currentUser} myPosts={true}/>
            </ProtectedRoute>} />
          <Route path='account/logout' element={
            <ProtectedRoute>
              <Logout />
            </ProtectedRoute>} />
          
            {/* <Route path='account' element={<MyAccount currentUser={currentUser} />} />
            <Route path='account/logout' element={<Logout/>} /> */}
        </Routes>
    )
};

export default Routers;

