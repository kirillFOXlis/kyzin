import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import MapPage from './pages/MapPage';
import DestinationsPage from './pages/DestinationsPage';
import DestinationDetailPage from './pages/DestinationDetailPage';
import RecommendationsPage from './pages/RecommendationsPage';
import { LoginPage, RegisterPage } from './pages/AuthPages';
import ProfilePage from './pages/ProfilePage';
import { AuthProvider } from './lib/auth';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/map" element={<MapPage />} />
              <Route path="/destinations" element={<DestinationsPage />} />
              <Route path="/destinations/:id" element={<DestinationDetailPage />} />
              <Route path="/recommendations" element={<RecommendationsPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;