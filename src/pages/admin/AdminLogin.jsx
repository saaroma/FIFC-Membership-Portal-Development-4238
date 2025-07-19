import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';
import SafeIcon from '../../components/common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiUser, FiLock, FiEye, FiEyeOff, FiArrowLeft, FiShield } = FiIcons;

const AdminLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const logoUrl = "https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1752323763528-fifc-logo.png";

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const success = await login(data.username, data.password, 'admin');
      if (success) {
        navigate('/admin');
      }
    } catch (error) {
      console.error('Admin login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full space-y-8"
      >
        {/* Header */}
        <div className="text-center">
          <Link to="/" className="inline-flex items-center text-gray-300 hover:text-white mb-6">
            <SafeIcon icon={FiArrowLeft} className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
          <div className="bg-white rounded-full p-4 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
            <img src={logoUrl} alt="FIFC Logo" className="h-12 w-12 object-contain" />
          </div>
          <div className="flex items-center justify-center mb-4">
            <SafeIcon icon={FiShield} className="h-6 w-6 text-primary-400 mr-2" />
            <h2 className="text-3xl font-bold text-white">
              Admin Portal
            </h2>
          </div>
          <p className="text-gray-300">
            Secure access to FIFC administration
          </p>
        </div>

        {/* Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="bg-white rounded-lg shadow-xl p-8">
            <div className="space-y-4">
              {/* Username */}
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SafeIcon icon={FiUser} className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    {...register('username', { required: 'Username is required' })}
                    type="text"
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    placeholder="Enter admin username"
                  />
                </div>
                {errors.username && (
                  <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SafeIcon icon={FiLock} className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    {...register('password', { required: 'Password is required' })}
                    type={showPassword ? 'text' : 'password'}
                    className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    placeholder="Enter admin password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <SafeIcon
                      icon={showPassword ? FiEyeOff : FiEye}
                      className="h-5 w-5 text-gray-400 hover:text-gray-600"
                    />
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-6">
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <SafeIcon icon={FiShield} className="mr-2 h-5 w-5" />
                {loading ? 'Authenticating...' : 'Access Admin Portal'}
              </button>
            </div>

            {/* Links */}
            <div className="mt-4 text-center">
              <Link to="/login" className="text-sm text-gray-600 hover:text-gray-800">
                Member Login
              </Link>
            </div>
          </div>
        </form>

        {/* Demo Credentials */}
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <h3 className="text-sm font-medium text-gray-200 mb-2">Demo Admin Credentials:</h3>
          <p className="text-xs text-gray-400">
            Username: superadmin<br />
            Password: admin
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;