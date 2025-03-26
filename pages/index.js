import BrickRoadSite from './brickRoadSite.js';
import About from './about.js';

import { HashRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(document.getElementById('mainContent'));

root.render(
   <React.StrictMode>
      <HashRouter>
      <Routes>
        <Route path="/" element={<BrickRoadSite />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<BrickRoadSite />} />
      </Routes>
      </HashRouter>
   </React.StrictMode>
);