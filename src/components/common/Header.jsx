import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import SafeIcon from './SafeIcon';
import { LOGO_URL } from '../../config/constants';
import * as FiIcons from 'react-icons/fi';

const { FiUser, FiLogOut, FiMenu, FiX } = FiIcons;

const Header = ({ title, showBackButton = false, isAdmin = false }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo and Title */}
          <div className="flex items-center space-x-6">
            <Link 
              to={isAdmin ? '/admin' : '/member'} 
              className="flex items-center"
            >
              <img 
                src={LOGO_URL} 
                alt="FIFC Logo" 
                className="h-16 w-16 object-contain hover:scale-105 transition-transform duration-200" 
              />
            </Link>
            {title && (
              <div className="hidden md:block">
                <span className="text-xl font-semibold text-gray-700">{title}</span>
              </div>
            )}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {user && (
              <>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <SafeIcon icon={FiUser} className="h-4 w-4" />
                  <span>{user.name || user.email}</span>
                  {user.type === 'admin' && (
                    <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                      Admin
                    </span>
                  )}
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <SafeIcon icon={FiLogOut} className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            >
              <SafeIcon icon={mobileMenuOpen ? FiX : FiMenu} className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-200 py-4"
          >
            {title && (
              <div className="px-4 py-2">
                <span className="text-lg font-semibold text-gray-700">{title}</span>
              </div>
            )}
            {user && (
              <div className="space-y-2">
                <div className="px-4 py-2 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <SafeIcon icon={FiUser} className="h-4 w-4" />
                    <span>{user.name || user.email}</span>
                    {user.type === 'admin' && (
                      <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                        Admin
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                >
                  <SafeIcon icon={FiLogOut} className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header;