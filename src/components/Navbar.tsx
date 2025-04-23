import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/auth';
import { Menu, X, MapPin, Compass, User, LogOut } from 'lucide-react';

const Navbar: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <Compass className="h-8 w-8 text-white" />
              <span className="ml-2 text-white font-bold text-xl">TravelExplorer</span>
            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <Link to="/map" className="text-white hover:text-blue-200 transition px-3 py-2 rounded-md text-sm font-medium flex items-center">
              <MapPin className="mr-1 h-4 w-4" />
              Map
            </Link>
            <Link to="/destinations" className="text-white hover:text-blue-200 transition px-3 py-2 rounded-md text-sm font-medium">
              Destinations
            </Link>
            <Link to="/recommendations" className="text-white hover:text-blue-200 transition px-3 py-2 rounded-md text-sm font-medium">
              Recommendations
            </Link>
            {user ? (
              <div className="relative group">
                <button className="text-white group-hover:text-blue-200 transition px-3 py-2 rounded-md text-sm font-medium flex items-center">
                  <User className="mr-1 h-4 w-4" />
                  Profile
                </button>
                <div className="absolute right-0 w-48 mt-2 py-2 bg-white rounded-md shadow-xl z-20 hidden group-hover:block">
                  <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    My Profile
                  </Link>
                  <button 
                    onClick={handleSignOut}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                  >
                    <LogOut className="mr-1 h-4 w-4" />
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex space-x-2">
                <Link to="/login" className="bg-white text-blue-600 hover:bg-blue-50 transition px-4 py-2 rounded-md text-sm font-medium">
                  Login
                </Link>
                <Link to="/register" className="bg-blue-500 text-white hover:bg-blue-400 transition px-4 py-2 rounded-md text-sm font-medium">
                  Register
                </Link>
              </div>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-blue-200 hover:bg-blue-700 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-blue-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              to="/map"
              onClick={() => setIsMenuOpen(false)}
              className="text-white hover:bg-blue-700 block px-3 py-2 rounded-md text-base font-medium"
            >
              Map
            </Link>
            <Link 
              to="/destinations"
              onClick={() => setIsMenuOpen(false)}
              className="text-white hover:bg-blue-700 block px-3 py-2 rounded-md text-base font-medium"
            >
              Destinations
            </Link>
            <Link 
              to="/recommendations"
              onClick={() => setIsMenuOpen(false)}
              className="text-white hover:bg-blue-700 block px-3 py-2 rounded-md text-base font-medium"
            >
              Recommendations
            </Link>
            {user ? (
              <>
                <Link 
                  to="/profile"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-white hover:bg-blue-700 block px-3 py-2 rounded-md text-base font-medium"
                >
                  My Profile
                </Link>
                <button
                  onClick={handleSignOut}
                  className="text-white hover:bg-blue-700 block w-full text-left px-3 py-2 rounded-md text-base font-medium"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-white hover:bg-blue-700 block px-3 py-2 rounded-md text-base font-medium"
                >
                  Login
                </Link>
                <Link 
                  to="/register"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-white hover:bg-blue-700 block px-3 py-2 rounded-md text-base font-medium"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;