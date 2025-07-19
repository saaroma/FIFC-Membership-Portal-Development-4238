```jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useData } from '../../context/DataContext';
import { toast } from 'react-toastify';
import Header from '../../components/common/Header';
import Navigation from '../../components/common/Navigation';
import SafeIcon from '../../components/common/SafeIcon';
import FamilyMemberDetails from '../../components/admin/FamilyMemberDetails';
import AddFamilyMemberModal from '../../components/admin/AddFamilyMemberModal';
import * as FiIcons from 'react-icons/fi';

const { FiSearch, FiFilter, FiPlus, FiEdit, FiTrash2, FiUser, FiUsers, FiDownload } = FiIcons;

const AdminFamilyMembers = () => {
  const { members, familyMembers, addFamilyMember, updateFamilyMember, deleteFamilyMember } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [householdFilter, setHouseholdFilter] = useState('all');
  const [selectedMember, setSelectedMember] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(false);

  // Filter family members based on search and household filter
  const filteredFamilyMembers = familyMembers.filter(member => {
    const fullName = `${member.firstName} ${member.lastName}`.toLowerCase();
    const matchesSearch = fullName.includes(searchTerm.toLowerCase());
    const matchesHousehold = householdFilter === 'all' || member.householdId === householdFilter;
    return matchesSearch && matchesHousehold;
  });

  // Get unique list of households from members
  const households = members.map(member => ({
    id: member.id,
    householdId: member.householdId,
    firstName: member.firstName,
    lastName: member.lastName
  }));

  const handleDeleteMember = (memberId, e) => {
    if (e) e.stopPropagation();
    
    if (window.confirm('Are you sure you want to remove this family member?')) {
      try {
        deleteFamilyMember(memberId);
        toast.success('Family member removed successfully');
      } catch (error) {
        toast.error('Failed to remove family member');
      }
    }
  };

  const handleAddFamilyMember = async (data) => {
    setLoading(true);
    try {
      await addFamilyMember(data);
      return true;
    } catch (error) {
      toast.error('Failed to add family member');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateFamilyMember = async (id, data) => {
    setLoading(true);
    try {
      await updateFamilyMember(id, data);
      return true;
    } catch (error) {
      toast.error('Failed to update family member');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const exportFamilyMembers = () => {
    // Prepare CSV content
    const csvContent = [
      ['ID', 'First Name', 'Last Name', 'Household ID', 'Relationship', 'Date of Birth', 'Is Deceased'],
      ...filteredFamilyMembers.map(member => [
        member.id,
        member.firstName,
        member.lastName,
        member.householdId,
        member.relationship,
        member.dateOfBirth,
        member.isDeceased ? 'Yes' : 'No'
      ])
    ].map(row => row.join(',')).join('\n');

    // Create and download the file
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'family-members.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Family Members" isAdmin={true} />
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
                  <h1 className="text-3xl font-bold text-gray-900">Family Members</h1>
                  <p className="text-gray-600 mt-2">Manage all family members across households</p>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={exportFamilyMembers}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 bg-white rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    <SafeIcon icon={FiDownload} className="h-4 w-4 mr-2" />
                    Export
                  </button>
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                  >
                    <SafeIcon icon={FiPlus} className="h-4 w-4 mr-2" />
                    Add Family Member
                  </button>
                </div>
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
                        placeholder="Search by name..."
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
                        value={householdFilter}
                        onChange={(e) => setHouseholdFilter(e.target.value)}
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                      >
                        <option value="all">All Households</option>
                        {households.map((household) => (
                          <option key={household.id} value={household.householdId}>
                            {household.householdId} - {household.firstName} {household.lastName}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Family Members Table */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Member
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Household
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Relationship
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date of Birth
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredFamilyMembers.map((member) => {
                        // Find the primary member of the household
                        const primaryMember = members.find(m => m.householdId === member.householdId);
                        const primaryMemberName = primaryMember 
                          ? `${primaryMember.firstName} ${primaryMember.lastName}`
                          : 'Unknown';
                        
                        return (
                          <tr
                            key={member.id}
                            className="hover:bg-gray-50 cursor-pointer"
                            onClick={() => setSelectedMember(member)}
                          >
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="h-10 w-10 flex-shrink-0 bg-gray-100 rounded-full flex items-center justify-center">
                                  <SafeIcon icon={FiUser} className="h-5 w-5 text-gray-500" />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">
                                    {member.firstName} {member.lastName}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{member.householdId}</div>
                              <div className="text-sm text-gray-500">{primaryMemberName}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
                                {member.relationship}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {new Date(member.dateOfBirth).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                member.isDeceased
                                  ? 'bg-red-100 text-red-800'
                                  : 'bg-green-100 text-green-800'
                              }`}>
                                {member.isDeceased ? 'Deceased' : 'Alive'}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <div className="flex space-x-2" onClick={(e) => e.stopPropagation()}>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedMember(member);
                                  }}
                                  className="text-primary-600 hover:text-primary-900"
                                >
                                  <SafeIcon icon={FiEdit} className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={(e) => handleDeleteMember(member.id, e)}
                                  className="text-red-600 hover:text-red-900"
                                >
                                  <SafeIcon icon={FiTrash2} className="h-4 w-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                {filteredFamilyMembers.length === 0 && (
                  <div className="text-center py-8">
                    <SafeIcon icon={FiUsers} className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No family members found</h3>
                    <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </main>
      </div>

      {/* Edit Family Member Modal */}
      {selectedMember && (
        <FamilyMemberDetails
          member={selectedMember}
          onClose={() => setSelectedMember(null)}
          onUpdate={handleUpdateFamilyMember}
        />
      )}

      {/* Add Family Member Modal */}
      {showAddModal && (
        <AddFamilyMemberModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddFamilyMember}
          households={households}
        />
      )}
    </div>
  );
};

export default AdminFamilyMembers;
```