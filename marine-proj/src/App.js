import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider, useUser } from './context/UserContext';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import Map from './pages/Map';
import Vessels from './pages/Vessels';
import VesselDetails from './pages/VesselDetails';
import VoyageReplay from './pages/VoyageReplay';
import Ports from './pages/Ports';
import Admin from './pages/Admin';
import './App.css';

const PrivateRoute = ({ children }) => {
  const { user } = useUser();
  return user ? children : <Navigate to="/login" />;
};

const AppContent = () => {
  const { user, login, logout, updateUser } = useUser();

  return (
    <Router>
      <div className="App">
        {user && <Navbar user={user} onLogout={logout} />}
        <Routes>
          <Route 
            path="/login" 
            element={user ? <Navigate to="/dashboard" /> : <Login onLogin={login} />} 
          />
          <Route 
            path="/register" 
            element={user ? <Navigate to="/dashboard" /> : <Register onLogin={login} />} 
          />
          <Route
            path="/"
            element={<Navigate to={user ? "/dashboard" : "/login"} />}
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/map"
            element={
              <PrivateRoute>
                <Map />
              </PrivateRoute>
            }
          />
          <Route
            path="/vessels"
            element={
              <PrivateRoute>
                <Vessels />
              </PrivateRoute>
            }
          />
          <Route
            path="/vessels/:id"
            element={
              <PrivateRoute>
                <VesselDetails />
              </PrivateRoute>
            }
          />
          <Route
            path="/voyage-replay"
            element={
              <PrivateRoute>
                <VoyageReplay />
              </PrivateRoute>
            }
          />
          <Route
            path="/ports"
            element={
              <PrivateRoute>
                <Ports />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile user={user} onUpdate={updateUser} />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <Admin user={user} />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

function App() {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
}

export default App;
