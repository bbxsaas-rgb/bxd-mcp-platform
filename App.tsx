import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import CreateProject from './pages/CreateProject';
import TestSuites from './pages/TestSuites';
import CreateTestSuite from './pages/CreateTestSuite';
import RunDetails from './pages/RunDetails';
import Settings from './pages/Settings';
import Help from './pages/Help';
import LandingPage from './pages/LandingPage';
import Auth from './pages/Auth';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Layout Wrapper
const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar />
      <div className="flex-1 ml-64 flex flex-col">
        <Header />
        <main className="p-8 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/auth" element={<Auth />} />
          <Route path="/welcome" element={<LandingPage />} />
          
          {/* Main Dashboard Routes (Protected) */}
          <Route 
            path="/" 
            element={
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            } 
          />
          <Route 
            path="/projects" 
            element={
              <DashboardLayout>
                <Projects />
              </DashboardLayout>
            } 
          />
          <Route 
            path="/projects/new" 
            element={
              <DashboardLayout>
                <CreateProject />
              </DashboardLayout>
            } 
          />
          <Route 
            path="/test-runs/:id" 
            element={
              <DashboardLayout>
                <RunDetails />
              </DashboardLayout>
            } 
          />
          <Route 
            path="/test-runs" 
            element={
              <DashboardLayout>
                <div className="flex items-center justify-center h-96 bg-white rounded-xl border-2 border-dashed border-slate-200">
                  <p className="text-slate-400 font-medium italic">Histórico completo em desenvolvimento...</p>
                </div>
              </DashboardLayout>
            } 
          />
          <Route 
            path="/test-suites" 
            element={
              <DashboardLayout>
                <TestSuites />
              </DashboardLayout>
            } 
          />
          <Route 
            path="/test-suites/new" 
            element={
              <DashboardLayout>
                <CreateTestSuite />
              </DashboardLayout>
            } 
          />
          <Route 
            path="/settings" 
            element={
              <DashboardLayout>
                <Settings />
              </DashboardLayout>
            } 
          />
          <Route 
            path="/help" 
            element={
              <DashboardLayout>
                <Help />
              </DashboardLayout>
            } 
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
