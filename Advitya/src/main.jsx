import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import HomePage from './pages/HomePage';
import Riddles from './pages/Riddles';
import MiddlePage from './pages/MiddlePage';
import LastPage from './pages/LastPage';
import NotFound from './pages/NotFound';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />}> 
          <Route index element={<HomePage/>} />
          <Route path="Riddles" element={<Riddles />} />
          <Route path="MiddlePage" element={<MiddlePage />} />
          <Route path="LastPage" element={<LastPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>
);
