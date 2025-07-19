```jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored auth data
    const storedUser = localStorage.getItem('fifc_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        localStorage.removeItem('fifc_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password, userType = 'member') => {
    try {
      // Simulate API call - replace with actual authentication
      if (userType === 'admin') {
        if (email === 'superadmin' && password === 'admin') {
          const adminUser = {
            id: '1',
            email: 'superadmin',
            name: 'Super Admin',
            type: 'admin',
            role: 'super_admin'
          };
          setUser(adminUser);
          localStorage.setItem('fifc_user', JSON.stringify(adminUser));
          toast.success('Admin login successful');
          return true;
        }
      } else {
        // Member login simulation
        if (email && password) {
          const memberUser = {
            id: '2',
            email: email,
            name: 'John Doe',
            type: 'member',
            householdId: 'HH001',
            membershipStatus: 'active',
            membershipExpiry: '2024-12-31'
          };
          setUser(memberUser);
          localStorage.setItem('fifc_user', JSON.stringify(memberUser));
          toast.success('Login successful');
          return true;
        }
      }

      toast.error('Invalid credentials');
      return false;
    } catch (error) {
      toast.error('Login failed');
      return false;
    }
  };

  const register = async (userData) => {
    try {
      // Simulate registration API call
      const newUser = {
        id: Date.now().toString(),
        email: userData.email,
        name: `${userData.firstName} ${userData.lastName}`,
        type: 'member',
        householdId: `HH${Date.now()}`,
        membershipStatus: 'pending',
        membershipExpiry: null
      };
      setUser(newUser);
      localStorage.setItem('fifc_user', JSON.stringify(newUser));
      toast.success('Registration successful');
      return true;
    } catch (error) {
      toast.error('Registration failed');
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('fifc_user');
    toast.success('Logged out successfully');
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
```