import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import Header from '../../components/common/Header';
import Navigation from '../../components/common/Navigation';
import SafeIcon from '../../components/common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiPlus, FiEdit, FiTrash2, FiUser, FiCalendar, FiHeart, FiX, FiUsers } = FiIcons;

const Family = () => {
  const { user } = useAuth();
  const { familyMembers, addFamilyMember, updateFamilyMember, deleteFamilyMember } = useData();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const userFamilyMembers = familyMembers.filter(member => member.householdId === user?.householdId);

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
      if (editingMember) {
        updateFamilyMember(editingMember.id, {
          ...data,
          householdId: user?.householdId
        });
        toast.success('Family member updated successfully');
        setEditingMember(null);
      } else {
        addFamilyMember({
          ...data,
          householdId: user?.householdId
        });
        toast.success('Family member added successfully');
        setShowAddForm(false);
      }
      reset();
    } catch (error) {
      toast.error('Failed to save family member');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (member) => {
    setEditingMember(member);
    reset({
      firstName: member.firstName,
      lastName: member.lastName,
      relationship: member.relationship,
      dateOfBirth: member.dateOfBirth
    });
    setShowAddForm(true);
  };

  const handleDelete = (memberId) => {
    if (window.confirm('Are you sure you want to remove this family member?')) {
      deleteFamilyMember(memberId);
      toast.success('Family member removed successfully');
    }
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setEditingMember(null);
    reset();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Family Members" />
      
      <div className="flex">
        <Navigation />
        
        <main className="flex-1 p-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Family Members</h1>
                  <p className="text-gray-600 mt-2">Manage your household family members</p>
                </div>
                <button
                  onClick={() => setShowAddForm(true)}
                  className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  <SafeIcon icon={FiPlus} className="h-4 w-4 mr-2" />
                  Add Family Member
                </button>
              </div>

              {/* Add/Edit Form */}
              {showAddForm && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {editingMember ? 'Edit Family Member' : 'Add New Family Member'}
                      </h3>
                      <button
                        onClick={handleCancel}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <SafeIcon icon={FiX} className="h-5 w-5" />
                      </button>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
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
                              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
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
                              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
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
                              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                            />
                          </div>
                          {errors.dateOfBirth && (
                            <p className="mt-1 text-sm text-red-600">{errors.dateOfBirth.message}</p>
                          )}
                        </div>
                      </div>

                      <div className="flex justify-end space-x-3 pt-4">
                        <button
                          type="button"
                          onClick={handleCancel}
                          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={loading}
                          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          {loading ? 'Saving...' : editingMember ? 'Update Member' : 'Add Member'}
                        </button>
                      </div>
                    </form>
                  </div>
                </motion.div>
              )}

              {/* Family Members List */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Current Family Members ({userFamilyMembers.length})
                  </h3>

                  {userFamilyMembers.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {userFamilyMembers.map((member) => (
                        <motion.div
                          key={member.id}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                                <SafeIcon icon={FiUser} className="h-5 w-5 text-primary-600" />
                              </div>
                              <div className="ml-3">
                                <h4 className="font-medium text-gray-900">
                                  {member.firstName} {member.lastName}
                                </h4>
                                <p className="text-sm text-gray-600 capitalize">{member.relationship}</p>
                              </div>
                            </div>
                            <div className="flex space-x-1">
                              <button
                                onClick={() => handleEdit(member)}
                                className="p-1 text-gray-400 hover:text-primary-600 transition-colors"
                              >
                                <SafeIcon icon={FiEdit} className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleDelete(member.id)}
                                className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                              >
                                <SafeIcon icon={FiTrash2} className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                          <div className="text-sm text-gray-600">
                            <p>Born: {new Date(member.dateOfBirth).toLocaleDateString()}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <SafeIcon icon={FiUsers} className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No family members added</h3>
                      <p className="text-gray-600 mb-4">
                        Add your family members to include them in your FIFC membership.
                      </p>
                      <button
                        onClick={() => setShowAddForm(true)}
                        className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                      >
                        <SafeIcon icon={FiPlus} className="h-4 w-4 mr-2" />
                        Add First Family Member
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Family;