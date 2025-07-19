```jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import SafeIcon from '../common/SafeIcon';
import { useData } from '../../context/DataContext';
import * as FiIcons from 'react-icons/fi';

const { FiSave, FiX, FiUser, FiCalendar, FiHeart, FiHome } = FiIcons;

const FamilyMemberDetails = ({ member, onClose, onUpdate }) => {
  const [loading, setLoading] = useState(false);
  const { members } = useData(); // Get access to all members to find household head

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      ...member,
      deathReportedDate: member.deathReportedDate || '',
    }
  });

  // Find the household head (primary member)
  const householdHead = members.find(m => m.householdId === member.householdId);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await onUpdate(member.id, data);
      toast.success('Family member updated successfully');
      onClose();
    } catch (error) {
      toast.error('Failed to update family member');
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
        className="bg-white rounded-lg shadow-xl max-w-2xl w-full"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">
              Edit Family Member Details
            </h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <SafeIcon icon={FiX} className="h-6 w-6" />
            </button>
          </div>

          {/* Household Information Section */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6 border border-gray-200">
            <h4 className="text-md font-medium text-gray-700 mb-3 flex items-center">
              <SafeIcon icon={FiHome} className="h-5 w-5 mr-2" />
              Household Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Household ID</p>
                <p className="text-sm font-medium text-gray-900">{member.householdId}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Household Head</p>
                <p className="text-sm font-medium text-gray-900">
                  {householdHead ? `${householdHead.firstName} ${householdHead.lastName}` : 'Not Found'}
                </p>
              </div>
            </div>
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
                    <option value="spouse">Spouse</option>
                    <option value="child">Child</option>
                    <option value="parent">Parent</option>
                    <option value="sibling">Sibling</option>
                    <option value="other">Other</option>
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
            </div>

            {/* Death Information */}
            <div className="space-y-4 border-t pt-4">
              <h4 className="text-lg font-medium text-gray-900">Death Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <input
                    {...register('isDeceased')}
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label className="text-sm text-gray-700">Deceased</label>
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    {...register('funeralArranged')}
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label className="text-sm text-gray-700">Funeral Arranged</label>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Death Reported Date
                  </label>
                  <input
                    {...register('deathReportedDate')}
                    type="date"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  />
                </div>
              </div>
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
                disabled={loading}
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

export default FamilyMemberDetails;
```