import BrickRoadSite from './app.js';
import About from './about/about.js';
import ReportPage from './report/reportPage.js';
import { HashRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom/client';
import '../styles.css';
import EditPage from './edit/editPage.js';
import Signin from './admin/signin.js';
import AdminDashboard from './admin/dashboard.js';
import ManageBricks from './admin/manage.js';
import { AuthProvider } from '../contexts/AuthContext.js';
import ProtectedRoute from '../components/ProtectedRoute.js';

const root = ReactDOM.createRoot(document.getElementById('mainContent'));

root.render(
   <React.StrictMode>
      <AuthProvider>
         <HashRouter>
         <Routes>
           <Route path="/" element={<BrickRoadSite />} />
           <Route path="/about" element={<About />} />
           <Route path="/report" element={<ReportPage />} />
           <Route path="/edit" element={<EditPage />} />
           <Route path="/admin/signin" element={<Signin />} />
           <Route path="/admin/dashboard" element={
             <ProtectedRoute>
               <AdminDashboard />
             </ProtectedRoute>
           } />
           <Route path="/admin/manage" element={
             <ProtectedRoute>
               <ManageBricks />
             </ProtectedRoute>
           } />
           <Route path="*" element={<BrickRoadSite />} />
         </Routes>
         </HashRouter>
      </AuthProvider>
   </React.StrictMode>
);