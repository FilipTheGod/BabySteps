import React from 'react';
import './App.css';

import Signup from './components/SignUp/Signup';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login/Login';

import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { PrivateRoute } from './components/PrivateRoute/PrivateRoute';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/" element={<PrivateRoute />}> */}
          <Route path="/" element={<Dashboard />} />
          {/* </Route> */}
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;