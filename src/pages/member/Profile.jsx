import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import Header from '../../components/common/Header';
import Navigation from '../../components/common/Navigation';
import SafeIcon from '../../components/common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiUser, FiMail, FiPhone, FiMapPin, FiSave, FiEdit } = FiIcons;

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      firstName: 'John',
      lastName: 'Doe',
      email: user?.email || '',
      phone: '+44 7700 900000',
      address: '123 Main Street, Dunfermline, KY11 1AA'
    }
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Profile updated successfully');
      setIsEditing(false);
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Profile" />
      
      <div className="flex">
        <Navigation />
        
        <main className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
                  <p className="text-gray-600 mt-2">Manage your personal information</p>
                </div>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  <SafeIcon icon={FiEdit} className="h-4 w-4 mr-2" />
                  {isEditing ? 'Cancel' : 'Edit Profile'}
                </button>
              </div>

              {/* Profile Form */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <form onSubmit={handleSubmit(onSubmit)} className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* First Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <SafeIcon icon={FiUser} className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          {...register('firstName', { required: 'First name is required' })}
                          type="text"
                          disabled={!isEditing}
                          className={`block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 sm:text-sm ${
                            !isEditing ? 'bg-gray-50' : ''
                          }`}
                        />
                      </div>
                      {errors.firstName && (
                        <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
                      )}
                    </div>

                    {/* Last Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <SafeIcon icon={FiUser} className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          {...register('lastName', { required: 'Last name is required' })}
                          type="text"
                          disabled={!isEditing}
                          className={`block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 sm:text-sm ${
                            !isEditing ? 'bg-gray-50' : ''
                          }`}
                        />
                      </div>
                      {errors.lastName && (
                        <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <SafeIcon icon={FiMail} className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          {...register('email', {
                            required: 'Email is required',
                            pattern: {
                              value: /^\S+@\S+$/i,
                              message: 'Invalid email address'
                            }
                          })}
                          type="email"
                          disabled={!isEditing}
                          className={`block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 sm:text-sm ${
                            !isEditing ? 'bg-gray-50' : ''
                          }`}
                        />
                      </div>
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <SafeIcon icon={FiPhone} className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          {...register('phone', { required: 'Phone number is required' })}
                          type="tel"
                          disabled={!isEditing}
                          className={`block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 sm:text-sm ${
                            !isEditing ? 'bg-gray-50' : ''
                          }`}
                        />
                      </div>
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Address */}
                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address
                    </label>
                    <div className="relative">
                      <div className="absolute top-3 left-0 pl-3 flex items-center pointer-events-none">
                        <SafeIcon icon={FiMapPin} className="h-5 w-5 text-gray-400" />
                      </div>
                      <textarea
                        {...register('address', { required: 'Address is required' })}
                        rows={3}
                        disabled={!isEditing}
                        className={`block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 sm:text-sm ${
                          !isEditing ? 'bg-gray-50' : ''
                        }`}
                      />
                    </div>
                    {errors.address && (
                      <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
                    )}
                  </div>

                  {/* Membership Info */}
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Membership Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Household ID
                        </label>
                        <input
                          type="text"
                          value={user?.householdId || 'HH001'}
                          disabled
                          className="block w-full px-3 py-3 border border-gray-300 rounded-lg bg-gray-50 sm:text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Membership Status
                        </label>
                        <input
                          type="text"
                          value={user?.membershipStatus || 'active'}
                          disabled
                          className="block w-full px-3 py-3 border border-gray-300 rounded-lg bg-gray-50 sm:text-sm capitalize"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Membership Expires
                        </label>
                        <input
                          type="text"
                          value={user?.membershipExpiry || '2024-12-31'}
                          disabled
                          className="block w-full px-3 py-3 border border-gray-300 rounded-lg bg-gray-50 sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Save Button */}
                  {isEditing && (
                    <div className="mt-6 flex justify-end">
                      <button
                        type="submit"
                        disabled={loading}
                        className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <SafeIcon icon={FiSave} className="h-4 w-4 mr-2" />
                        {loading ? 'Saving...' : 'Save Changes'}
                      </button>
                    </div>
                  )}
                </form>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;