import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import SafeIcon from '../components/common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiUser, FiMail, FiPhone, FiMapPin, FiLock, FiEye, FiEyeOff, FiArrowLeft, FiCheck } = FiIcons;

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, watch } = useForm();

  const logoUrl = "https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1752323763528-fifc-logo.png";
  const password = watch('password');

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const success = await registerUser(data);
      if (success) {
        navigate('/member');
      }
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => setStep(2);
  const prevStep = () => setStep(1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full space-y-8"
      >
        {/* Header */}
        <div className="text-center">
          <Link to="/" className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6">
            <SafeIcon icon={FiArrowLeft} className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
          <img 
            src={logoUrl} 
            alt="FIFC Logo" 
            className="mx-auto h-16 w-16 object-contain"
          />
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Join FIFC
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Become a member of our community
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center space-x-4">
          <div className={`flex items-center ${step >= 1 ? 'text-primary-600' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
              step >= 1 ? 'border-primary-600 bg-primary-600 text-white' : 'border-gray-300'
            }`}>
              {step > 1 ? <SafeIcon icon={FiCheck} className="h-4 w-4" /> : '1'}
            </div>
            <span className="ml-2 text-sm font-medium">Personal Info</span>
          </div>
          <div className={`w-8 h-0.5 ${step >= 2 ? 'bg-primary-600' : 'bg-gray-300'}`}></div>
          <div className={`flex items-center ${step >= 2 ? 'text-primary-600' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
              step >= 2 ? 'border-primary-600 bg-primary-600 text-white' : 'border-gray-300'
            }`}>
              2
            </div>
            <span className="ml-2 text-sm font-medium">Account</span>
          </div>
        </div>

        {/* Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              {/* First Name */}
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                  First Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SafeIcon icon={FiUser} className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    {...register('firstName', { required: 'First name is required' })}
                    type="text"
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    placeholder="Enter your first name"
                  />
                </div>
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
                )}
              </div>

              {/* Last Name */}
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SafeIcon icon={FiUser} className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    {...register('lastName', { required: 'Last name is required' })}
                    type="text"
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    placeholder="Enter your last name"
                  />
                </div>
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SafeIcon icon={FiPhone} className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    {...register('phone', { required: 'Phone number is required' })}
                    type="tel"
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    placeholder="+44 7700 900000"
                  />
                </div>
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                )}
              </div>

              {/* Address */}
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                  Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SafeIcon icon={FiMapPin} className="h-5 w-5 text-gray-400" />
                  </div>
                  <textarea
                    {...register('address', { required: 'Address is required' })}
                    rows={3}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    placeholder="Enter your full address"
                  />
                </div>
                {errors.address && (
                  <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
                )}
              </div>

              <button
                type="button"
                onClick={nextStep}
                className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
              >
                Continue
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
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
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    placeholder="Enter your email"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
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
                    {...register('password', {
                      required: 'Password is required',
                      minLength: {
                        value: 6,
                        message: 'Password must be at least 6 characters'
                      }
                    })}
                    type={showPassword ? 'text' : 'password'}
                    className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    placeholder="Create a password"
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

              {/* Confirm Password */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SafeIcon icon={FiLock} className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    {...register('confirmPassword', {
                      required: 'Please confirm your password',
                      validate: value => value === password || 'Passwords do not match'
                    })}
                    type={showConfirmPassword ? 'text' : 'password'}
                    className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    <SafeIcon 
                      icon={showConfirmPassword ? FiEyeOff : FiEye} 
                      className="h-5 w-5 text-gray-400 hover:text-gray-600" 
                    />
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
                )}
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-start">
                <input
                  {...register('acceptTerms', { required: 'You must accept the terms and conditions' })}
                  type="checkbox"
                  className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-700">
                  I agree to the{' '}
                  <a href="#" className="text-primary-600 hover:text-primary-500">
                    Terms and Conditions
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-primary-600 hover:text-primary-500">
                    Privacy Policy
                  </a>
                </label>
              </div>
              {errors.acceptTerms && (
                <p className="text-sm text-red-600">{errors.acceptTerms.message}</p>
              )}

              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={prevStep}
                  className="flex-1 flex justify-center py-3 px-4 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? 'Creating Account...' : 'Create Account'}
                </button>
              </div>
            </motion.div>
          )}

          {/* Links */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
                Sign in here
              </Link>
            </p>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Register;