import React from 'react';
import ReactDOM from 'react-dom/client';
import { StrictMode } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import './styles/bootstrap/css/bootstrap.css'

import Login from './pages/layouts/login'
import Home from './pages/contents/home'
import Students from './pages/contents/students'
import Activities from './pages/contents/activities'
import Personal from './pages/contents/personal'
import Messages from './pages/contents/messages'
import Password from './pages/contents/password'
import Error from './pages/contents/error'
import Layout from './pages/layouts/layout'

const roott = document.getElementById('root')
roott.style.padding = "0px"
roott.style.margin = "0px"

const root = ReactDOM.createRoot(roott);

function Protected({ children }) {
  if (!localStorage.getItem("signedIn")) {
    return <Navigate to="/" replace />
  }
  return children
}

const App = () => {

  return(
  <StrictMode>
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Login />} />
          <Route path="home" element={
            <Protected >
                <Layout Body={Home} title={"Home Page"} />
            </Protected>
          } />
          <Route path="students" element={
            <Protected >
                <Layout Body={Students} title={"Students List"} />
            </Protected>
          } />
          <Route path="activities" element={
            <Protected >
                <Layout Body={Activities} title={"Activities List"} />
            </Protected>
          } />
          <Route path="personal-infos" element={
            <Protected >
                <Layout Body={Personal} title={"Personal Informations"} />
            </Protected>
          } />
          <Route path="messages" element={
            <Protected >
                <Layout Body={Messages} title={"Messages"} />
            </Protected>
          } />
          <Route path="password" element={
            <Protected >
                <Layout Body={Password} title={"Change Password"} />
            </Protected>
          } />
          <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
  ) 
}

root.render(
  <App />
)