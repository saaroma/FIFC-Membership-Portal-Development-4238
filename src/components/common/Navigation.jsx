```jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import SafeIcon from './SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { 
  FiHome, 
  FiUsers, 
  FiDollarSign, 
  FiSettings, 
  FiFileText, 
  FiUser, 
  FiUserPlus,
  FiCreditCard,
  FiTrendingUp  // Added this import
} = FiIcons;

const Navigation = ({ isAdmin = false }) => {
  const location = useLocation();

  const adminNavItems = [
    {
      path: '/admin',
      icon: FiHome,
      label: 'Dashboard'
    },
    {
      path: '/admin/members',
      icon: FiUsers,
      label: 'Members'
    },
    {
      path: '/admin/payments',
      icon: FiDollarSign,
      label: 'Payments'
    },
    {
      path: '/admin/family-members',
      icon: FiUserPlus,
      label: 'Family Members'
    },
    {
      path: '/admin/reports',
      icon: FiFileText,
      label: 'Reports'
    },
    {
      path: '/admin/analytics',
      icon: FiTrendingUp,
      label: 'Analytics'
    },
    {
      path: '/admin/settings',
      icon: FiSettings,
      label: 'Settings'
    }
  ];

  const memberNavItems = [
    {
      path: '/member',
      icon: FiHome,
      label: 'Dashboard'
    },
    {
      path: '/member/profile',
      icon: FiUser,
      label: 'Profile'
    },
    {
      path: '/member/family',
      icon: FiUsers,
      label: 'Family'
    },
    {
      path: '/member/payments',
      icon: FiCreditCard,
      label: 'Payments'
    }
  ];

  const navItems = isAdmin ? adminNavItems : memberNavItems;

  return (
    <nav className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <div className="py-4">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center space-x-2 px-6 py-3 text-sm font-medium transition-colors ${
              location.pathname === item.path
                ? 'text-primary-600 bg-primary-50'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <SafeIcon icon={item.icon} className="h-5 w-5" />
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
```