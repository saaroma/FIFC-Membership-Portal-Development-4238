```jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiX, FiSave, FiUser, FiCalendar, FiHeart } = FiIcons;

const AddFamilyMemberModal = ({ onClose, onAdd, member }) => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const relationshipOptions = [
    'spouse',
    'child',
    'parent',
    'sibling',
    'grandparent',
    'grandchild',
    'other'
  ];

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await onAdd({
        ...data,
        householdId: member.householdId
      });
    } finally {
      setLoading(false);
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
        className="bg-white rounded-lg shadow-xl max-w-lg w-full"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                Add Family Member
              </h3>
              <p className="text-sm text-gray-500">
                Adding family member for {member.firstName} {member.lastName}
              </p>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <SafeIcon icon={FiX} className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                  placeholder="Enter first name"
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
                  placeholder="Enter last name"
                />
              </div>
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
              )}
            </div>

            {/* Relationship */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Relationship
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SafeIcon icon={FiHeart} className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  {...register('relationship', { required: 'Relationship is required' })}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                >
                  <option value="">Select relationship</option>
                  {relationshipOptions.map((option) => (
                    <option key={option} value={option} className="capitalize">
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              {errors.relationship && (
                <p className="mt-1 text-sm text-red-600">{errors.relationship.message}</p>
              )}
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date of Birth
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SafeIcon icon={FiCalendar} className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  {...register('dateOfBirth', { required: 'Date of birth is required' })}
                  type="date"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                />
              </div>
              {errors.dateOfBirth && (
                <p className="mt-1 text-sm text-red-600">{errors.dateOfBirth.message}</p>
              )}
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <SafeIcon icon={FiSave} className="h-4 w-4 mr-2 inline" />
                {loading ? 'Adding...' : 'Add Family Member'}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AddFamilyMemberModal;
```