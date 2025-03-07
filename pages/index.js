import Title from './brickRoadSite.js';
import { HashRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(document.getElementById('mainContent'));

root.render(
   <React.StrictMode>
      <HashRouter>
      <Routes>
        <Route path="/" element={<Title />} />
        <Route path="*" element={<Title />} />
      </Routes>
      </HashRouter>
   </React.StrictMode>
);