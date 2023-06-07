import React from 'react';
import Register from './pages/Register';
import Login from './pages/Login';
import './App.css';
import { BrowserRouter, Routes, Route, HashRouter } from 'react-router-dom';

function App() {
  return (
    <div>
      <HashRouter>
        <Routes>
          <Route index element={<Login/>} />
          <Route path='/register' element={<Register/>} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
