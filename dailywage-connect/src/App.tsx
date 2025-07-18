import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AppProvider } from './context/AppContext';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import ProtectedRoute from './components/ProtectedRoute';

// Import other pages (we'll create these next)
const Workers = React.lazy(() => import('./pages/Workers'));
const Tools = React.lazy(() => import('./pages/Tools'));
const Bookings = React.lazy(() => import('./pages/Bookings'));
const WorkerDashboard = React.lazy(() => import('./pages/worker/Dashboard'));
const Profile = React.lazy(() => import('./pages/Profile'));

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="App">
          <Toaster position="top-right" />
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            
            {/* Routes with layout */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              
              {/* Lazy loaded pages with Suspense */}
              <Route 
                path="/workers" 
                element={
                  <React.Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
                    <Workers />
                  </React.Suspense>
                } 
              />
              <Route 
                path="/tools" 
                element={
                  <React.Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
                    <Tools />
                  </React.Suspense>
                } 
              />
              
              {/* Protected routes */}
              <Route 
                path="/bookings" 
                element={
                  <ProtectedRoute>
                    <React.Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
                      <Bookings />
                    </React.Suspense>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute>
                    <React.Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
                      <Profile />
                    </React.Suspense>
                  </ProtectedRoute>
                } 
              />
              
              {/* Worker routes */}
              <Route 
                path="/worker/dashboard" 
                element={
                  <ProtectedRoute requireWorker>
                    <React.Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
                      <WorkerDashboard />
                    </React.Suspense>
                  </ProtectedRoute>
                } 
              />
              
              {/* Static pages */}
              <Route path="/how-it-works" element={<div className="p-8 text-center">How It Works - Coming Soon</div>} />
              <Route path="/contact" element={<div className="p-8 text-center">Contact - Coming Soon</div>} />
              <Route path="/help" element={<div className="p-8 text-center">Help Center - Coming Soon</div>} />
              
              {/* 404 */}
              <Route path="*" element={<div className="p-8 text-center">Page Not Found</div>} />
            </Route>
          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
