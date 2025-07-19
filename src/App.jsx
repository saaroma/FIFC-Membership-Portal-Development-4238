```jsx
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import ProtectedRoute from './components/common/ProtectedRoute';

// Pages
import Welcome from './pages/Welcome';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminLogin from './pages/admin/AdminLogin';

// Member Pages
import Dashboard from './pages/member/Dashboard';
import Profile from './pages/member/Profile';
import Family from './pages/member/Family';
import Payments from './pages/member/Payments';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import AdminMembers from './pages/admin/Members';
import AdminPayments from './pages/admin/Payments';
import AdminFamilyMembers from './pages/admin/FamilyMembers';
import AdminReports from './pages/admin/Reports';
import AdminSettings from './pages/admin/Settings';
import Analytics from './pages/admin/Analytics';

import './App.css';

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <div className="App">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Welcome />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/admin/login" element={<AdminLogin />} />

              {/* Member Routes */}
              <Route path="/member" element={
                <ProtectedRoute userType="member">
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/member/profile" element={
                <ProtectedRoute userType="member">
                  <Profile />
                </ProtectedRoute>
              } />
              <Route path="/member/family" element={
                <ProtectedRoute userType="member">
                  <Family />
                </ProtectedRoute>
              } />
              <Route path="/member/payments" element={
                <ProtectedRoute userType="member">
                  <Payments />
                </ProtectedRoute>
              } />

              {/* Admin Routes */}
              <Route path="/admin" element={
                <ProtectedRoute userType="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              <Route path="/admin/members" element={
                <ProtectedRoute userType="admin">
                  <AdminMembers />
                </ProtectedRoute>
              } />
              <Route path="/admin/payments" element={
                <ProtectedRoute userType="admin">
                  <AdminPayments />
                </ProtectedRoute>
              } />
              <Route path="/admin/family-members" element={
                <ProtectedRoute userType="admin">
                  <AdminFamilyMembers />
                </ProtectedRoute>
              } />
              <Route path="/admin/reports" element={
                <ProtectedRoute userType="admin">
                  <AdminReports />
                </ProtectedRoute>
              } />
              <Route path="/admin/analytics" element={
                <ProtectedRoute userType="admin">
                  <Analytics />
                </ProtectedRoute>
              } />
              <Route path="/admin/settings" element={
                <ProtectedRoute userType="admin">
                  <AdminSettings />
                </ProtectedRoute>
              } />
            </Routes>
            <ToastContainer 
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </div>
        </Router>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
```