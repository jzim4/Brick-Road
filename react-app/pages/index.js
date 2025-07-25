import BrickRoadSite from './app.js';
import About from './about/about.js';
import ReportPage from './report/reportPage.js';
import { HashRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom/client';
import Signin from './admin/signin.js';
import AdminDashboard from './admin/dashboard.js';
import ManageBricks from './admin/manage.js';
import { AuthProvider } from '../contexts/AuthContext.js';
import ProtectedRoute from '../components/ProtectedRoute.js';
import Reports from './admin/reports.js';
import PageNotFound from './404.js';
import '../styles/global.css';
import CreateBrick from './admin/createBrick.js';

const root = ReactDOM.createRoot(document.getElementById('mainContent'));

root.render(
   <React.StrictMode>
      <AuthProvider>
         <HashRouter>
         <Routes>
           <Route path="/" element={<BrickRoadSite />} />
           <Route path="/about" element={<About />} />
           <Route path="/report" element={<ReportPage />} />
           <Route path="/admin/signin" element={<Signin />} />
           <Route path="/admin/dashboard" element={
             <ProtectedRoute>
               <AdminDashboard />
             </ProtectedRoute>
           } />
           <Route path="/admin/manage/:panel/:col/:row" element={
             <ProtectedRoute>
               <ManageBricks />
             </ProtectedRoute>
           } />
           <Route path="/admin/requests" element={
             <ProtectedRoute>
               <Reports />
             </ProtectedRoute>
           } />
           <Route path="/admin/create-brick" element={
             <ProtectedRoute>
               <CreateBrick />
             </ProtectedRoute>
           } />
           <Route path="*" element={<PageNotFound />} />
         </Routes>
         </HashRouter>
      </AuthProvider>
   </React.StrictMode>
);