import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Likes from './pages/Likes';
import Listen from './pages/Listen';
import Reviews from './pages/Reviews';
import { ProfileProvider } from './context/ProfileContext';
import TopMenu from './components/TopMenu/TopMenu';
import './App.css';

function App() {
  return (
    <ProfileProvider>
      <Router>
        <Main />
      </Router>
    </ProfileProvider>
  );
}

function Main() {
  const location = useLocation();

  const hideTopMenuOnPaths = ['/'];

  return (
    <>
      {!hideTopMenuOnPaths.includes(location.pathname) && <TopMenu />}
      <div className="main-container">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/likes" element={<Likes />} />
          <Route path="/listen" element={<Listen />} />
          <Route path="/reviews" element={<Reviews />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
