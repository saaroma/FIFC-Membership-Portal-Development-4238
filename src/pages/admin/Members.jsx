import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useData } from '../../context/DataContext';
import { toast } from 'react-toastify';
import Header from '../../components/common/Header';
import Navigation from '../../components/common/Navigation';
import SafeIcon from '../../components/common/SafeIcon';
import EditMemberModal from '../../components/admin/EditMemberModal';
import AddFamilyMemberModal from '../../components/admin/AddFamilyMemberModal';
import FamilyMemberDetails from '../../components/admin/FamilyMemberDetails';
import * as FiIcons from 'react-icons/fi';

const { 
  FiSearch, FiFilter, FiPlus, FiChevronDown, FiChevronUp, FiEdit, FiTrash2, 
  FiUser, FiUsers, FiDownload, FiMail, FiPhone, FiMapPin, FiCalendar 
} = FiIcons;

const AdminMembers = () => {
  const { members, familyMembers, addMember, updateMember, addFamilyMember, updateFamilyMember, deleteFamilyMember } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedMember, setSelectedMember] = useState(null);
  const [expandedMember, setExpandedMember] = useState(null);
  const [showAddFamilyModal, setShowAddFamilyModal] = useState(false);
  const [selectedFamilyMember, setSelectedFamilyMember] = useState(null);
  const [editingMainMember, setEditingMainMember] = useState(null);
  const [loading, setLoading] = useState(false);

  const filteredMembers = members.filter(member => {
    const fullName = `${member.firstName} ${member.lastName}`.toLowerCase();
    const matchesSearch = fullName.includes(searchTerm.toLowerCase()) || 
                         member.email.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         member.phone.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || member.membershipStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getFamilyMembers = (householdId) => {
    return familyMembers.filter(fm => fm.householdId === householdId);
  };

  const handleUpdateMainMember = async (memberId, data) => {
    setLoading(true);
    try {
      await updateMember(memberId, data);
      toast.success('Member updated successfully');
      setEditingMainMember(null);
    } catch (error) {
      toast.error('Failed to update member');
    } finally {
      setLoading(false);
    }
  };

  const handleAddFamilyMember = async (data) => {
    setLoading(true);
    try {
      await addFamilyMember({
        ...data,
        householdId: expandedMember.householdId
      });
      toast.success('Family member added successfully');
      setShowAddFamilyModal(false);
    } catch (error) {
      toast.error('Failed to add family member');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateFamilyMember = async (familyMemberId, data) => {
    setLoading(true);
    try {
      await updateFamilyMember(familyMemberId, data);
      toast.success('Family member updated successfully');
      setSelectedFamilyMember(null);
    } catch (error) {
      toast.error('Failed to update family member');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteFamilyMember = (familyMemberId) => {
    if (window.confirm('Are you sure you want to remove this family member?')) {
      try {
        deleteFamilyMember(familyMemberId);
        toast.success('Family member removed successfully');
      } catch (error) {
        toast.error('Failed to remove family member');
      }
    }
  };

  const toggleMemberExpansion = (member) => {
    setExpandedMember(expandedMember?.id === member.id ? null : member);
  };

  const exportMembers = () => {
    const csvContent = [
      ['Name', 'Email', 'Phone', 'Status', 'Household ID'],
      ...filteredMembers.map(member => [
        `${member.firstName} ${member.lastName}`,
        member.email,
        member.phone,
        member.membershipStatus,
        member.householdId
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'members-export.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Membership Management" isAdmin={true} />
      <div className="flex">
        <Navigation isAdmin={true} />
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Membership Management</h1>
                  <p className="text-gray-600 mt-2">Manage members and their family information</p>
                </div>
                <button
                  onClick={exportMembers}
                  className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  <SafeIcon icon={FiDownload} className="h-4 w-4 mr-2" />
                  Export Data
                </button>
              </div>

              {/* Filters */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <SafeIcon icon={FiSearch} className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        placeholder="Search members..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <SafeIcon icon={FiFilter} className="h-5 w-5 text-gray-400" />
                      </div>
                      <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                      >
                        <option value="all">All Status</option>
                        <option value="active">Active</option>
                        <option value="pending">Pending</option>
                        <option value="expired">Expired</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Members List */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="divide-y divide-gray-200">
                  {filteredMembers.map((member) => (
                    <div key={member.id} className="group">
                      {/* Member Row */}
                      <div className="p-6 hover:bg-gray-50">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 flex-1">
                            <div className="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center">
                              <SafeIcon icon={FiUser} className="h-6 w-6 text-gray-500" />
                            </div>
                            
                            {/* Member Details Grid */}
                            <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
                              <div>
                                <h3 className="text-lg font-medium text-gray-900">
                                  {member.firstName} {member.lastName}
                                </h3>
                                <p className="text-sm text-gray-500">ID: {member.householdId}</p>
                              </div>
                              
                              <div className="flex items-center text-sm text-gray-600">
                                <SafeIcon icon={FiMail} className="h-4 w-4 mr-2 text-gray-400" />
                                {member.email}
                              </div>
                              
                              <div className="flex items-center text-sm text-gray-600">
                                <SafeIcon icon={FiPhone} className="h-4 w-4 mr-2 text-gray-400" />
                                {member.phone}
                              </div>
                              
                              <div className="flex items-center justify-between">
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                  member.membershipStatus === 'active' 
                                    ? 'bg-green-100 text-green-800' 
                                    : member.membershipStatus === 'pending' 
                                    ? 'bg-yellow-100 text-yellow-800' 
                                    : 'bg-red-100 text-red-800'
                                }`}>
                                  {member.membershipStatus}
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2 ml-4">
                            <button
                              onClick={() => setEditingMainMember(member)}
                              className="text-primary-600 hover:text-primary-700 p-2 rounded-lg hover:bg-primary-50"
                              title="Edit Member"
                            >
                              <SafeIcon icon={FiEdit} className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => toggleMemberExpansion(member)}
                              className="text-gray-400 hover:text-gray-600 p-2 rounded-lg hover:bg-gray-100"
                              title="View Family Members"
                            >
                              <SafeIcon icon={expandedMember?.id === member.id ? FiChevronUp : FiChevronDown} className="h-5 w-5" />
                            </button>
                          </div>
                        </div>

                        {/* Additional Member Info Row */}
                        <div className="mt-4 ml-16 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <SafeIcon icon={FiMapPin} className="h-4 w-4 mr-2 text-gray-400" />
                            <span className="truncate">{member.address}</span>
                          </div>
                          <div className="flex items-center">
                            <SafeIcon icon={FiCalendar} className="h-4 w-4 mr-2 text-gray-400" />
                            <span>Expires: {member.membershipExpiry || 'Not set'}</span>
                          </div>
                        </div>
                      </div>

                      {/* Expanded Family Members Section */}
                      {expandedMember?.id === member.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="bg-gray-50 p-6 border-t border-gray-200"
                        >
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="text-lg font-medium text-gray-900 flex items-center">
                              <SafeIcon icon={FiUsers} className="h-5 w-5 mr-2" />
                              Family Members ({getFamilyMembers(member.householdId).length})
                            </h4>
                            <button
                              onClick={() => {
                                setExpandedMember(member);
                                setShowAddFamilyModal(true);
                              }}
                              className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
                            >
                              <SafeIcon icon={FiPlus} className="h-4 w-4 mr-2" />
                              Add Family Member
                            </button>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {getFamilyMembers(member.householdId).map((familyMember) => (
                              <div
                                key={familyMember.id}
                                className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-sm transition-shadow"
                              >
                                <div className="flex items-start justify-between mb-3">
                                  <div className="flex items-center flex-1">
                                    <div className="h-10 w-10 bg-primary-100 rounded-full flex items-center justify-center">
                                      <SafeIcon icon={FiUser} className="h-5 w-5 text-primary-600" />
                                    </div>
                                    <div className="ml-3 flex-1">
                                      <h5 className="text-sm font-medium text-gray-900">
                                        {familyMember.firstName} {familyMember.lastName}
                                      </h5>
                                      <p className="text-sm text-gray-600 capitalize">
                                        {familyMember.relationship}
                                      </p>
                                      <p className="text-xs text-gray-500">
                                        Born: {new Date(familyMember.dateOfBirth).toLocaleDateString()}
                                      </p>
                                      {familyMember.isDeceased && (
                                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 mt-1">
                                          Deceased
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                  
                                  <div className="flex space-x-1 ml-2">
                                    <button
                                      onClick={() => setSelectedFamilyMember(familyMember)}
                                      className="p-1 text-gray-400 hover:text-primary-600 transition-colors"
                                      title="Edit Family Member"
                                    >
                                      <SafeIcon icon={FiEdit} className="h-4 w-4" />
                                    </button>
                                    <button
                                      onClick={() => handleDeleteFamilyMember(familyMember.id)}
                                      className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                                      title="Remove Family Member"
                                    >
                                      <SafeIcon icon={FiTrash2} className="h-4 w-4" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>

                          {getFamilyMembers(member.householdId).length === 0 && (
                            <div className="text-center py-8">
                              <SafeIcon icon={FiUsers} className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                              <p className="text-gray-500">No family members added yet</p>
                              <button
                                onClick={() => {
                                  setExpandedMember(member);
                                  setShowAddFamilyModal(true);
                                }}
                                className="mt-2 text-primary-600 hover:text-primary-700 text-sm font-medium"
                              >
                                Add the first family member
                              </button>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </div>
                  ))}
                </div>

                {filteredMembers.length === 0 && (
                  <div className="text-center py-8">
                    <SafeIcon icon={FiUsers} className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No members found</h3>
                    <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </main>
      </div>

      {/* Edit Main Member Modal */}
      {editingMainMember && (
        <EditMemberModal
          member={editingMainMember}
          onClose={() => setEditingMainMember(null)}
          onUpdate={handleUpdateMainMember}
        />
      )}

      {/* Add Family Member Modal */}
      {showAddFamilyModal && (
        <AddFamilyMemberModal
          onClose={() => setShowAddFamilyModal(false)}
          onAdd={handleAddFamilyMember}
          member={expandedMember}
        />
      )}

      {/* Edit Family Member Modal */}
      {selectedFamilyMember && (
        <FamilyMemberDetails
          member={selectedFamilyMember}
          onClose={() => setSelectedFamilyMember(null)}
          onUpdate={handleUpdateFamilyMember}
        />
      )}
    </div>
  );
};

export default AdminMembers;