```jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiX, FiSave, FiUser, FiMail, FiPhone, FiMapPin } = FiIcons;

const EditMemberModal = ({ member, onClose, onUpdate }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      firstName: member.firstName,
      lastName: member.lastName,
      email: member.email,
      phone: member.phone,
      address: member.address,
      membershipStatus: member.membershipStatus,
      membershipExpiry: member.membershipExpiry,
      category: member.category
    }
  });

  const onSubmit = async (data) => {
    try {
      await onUpdate(member.id, data);
      toast.success('Member updated successfully');
      onClose();
    } catch (error) {
      toast.error('Failed to update member');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-lg shadow-xl max-w-2xl w-full"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">
              Edit Member Details
            </h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <SafeIcon icon={FiX} className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
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
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  />
                </div>
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
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
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SafeIcon icon={FiPhone} className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    {...register('phone', { required: 'Phone is required' })}
                    type="tel"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  />
                </div>
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                )}
              </div>

              {/* Membership Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Membership Status
                </label>
                <select
                  {...register('membershipStatus')}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                >
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="expired">Expired</option>
                </select>
              </div>

              {/* Membership Expiry */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Membership Expiry
                </label>
                <input
                  {...register('membershipExpiry')}
                  type="date"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                />
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address
              </label>
              <div className="relative">
                <div className="absolute top-3 left-3 pointer-events-none">
                  <SafeIcon icon={FiMapPin} className="h-5 w-5 text-gray-400" />
                </div>
                <textarea
                  {...register('address', { required: 'Address is required' })}
                  rows={3}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                />
              </div>
              {errors.address && (
                <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
              )}
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
              >
                <SafeIcon icon={FiSave} className="h-4 w-4 mr-2 inline" />
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default EditMemberModal;
```