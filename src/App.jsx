import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import GoogleLoginComponent from './components/Login/Login';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import ErrorPage from './components/ErrorPage/ErrorPage';
import AppointmentPage from './components/AppointmentPage/AppointmentPage';


const MainLayout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<GoogleLoginComponent />} />
        <Route path="/" element={<MainLayout><HomePage /></MainLayout>} />
        <Route path="/appointment" element={<AppointmentPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
};

export default App;
