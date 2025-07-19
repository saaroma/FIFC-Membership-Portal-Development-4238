```jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useData } from '../../context/DataContext';
import Header from '../../components/common/Header';
import Navigation from '../../components/common/Navigation';
import SafeIcon from '../../components/common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiFileText, FiUsers, FiDollarSign, FiCalendar, FiDownload, FiTrendingUp } = FiIcons;

const AdminReports = () => {
  const { members, payments, familyMembers } = useData();
  const [selectedReport, setSelectedReport] = useState('overview');

  const reports = [
    {
      id: 'overview',
      title: 'Overview Report',
      description: 'General statistics and key metrics'
    },
    {
      id: 'members',
      title: 'Membership Report',
      description: 'Detailed member statistics and trends'
    },
    {
      id: 'payments',
      title: 'Payment Report',
      description: 'Revenue and payment analysis'
    },
    {
      id: 'deaths',
      title: 'Death Records Report',
      description: 'Overview of reported deaths and funeral arrangements'
    }
  ];

  const exportReport = (reportType) => {
    // Simulate export functionality
    console.log(`Exporting ${reportType} report`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Reports" isAdmin={true} />
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
                  <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
                  <p className="text-gray-600 mt-2">View detailed reports and system analytics</p>
                </div>
                <button
                  onClick={() => exportReport(selectedReport)}
                  className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  <SafeIcon icon={FiDownload} className="h-4 w-4 mr-2" />
                  Export Report
                </button>
              </div>

              {/* Report Selection */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
                  {reports.map((report) => (
                    <button
                      key={report.id}
                      onClick={() => setSelectedReport(report.id)}
                      className={`p-6 text-left border-r border-b border-gray-200 last:border-r-0 hover:bg-gray-50 transition-colors ${
                        selectedReport === report.id ? 'bg-primary-50 border-primary-200' : ''
                      }`}
                    >
                      <h3 className={`font-medium mb-2 ${
                        selectedReport === report.id ? 'text-primary-700' : 'text-gray-900'
                      }`}>
                        {report.title}
                      </h3>
                      <p className="text-sm text-gray-600">{report.description}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Report Content */}
              <div className="space-y-6">
                {selectedReport === 'overview' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                        <div className="flex items-center">
                          <SafeIcon icon={FiUsers} className="h-8 w-8 text-blue-600" />
                          <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Total Members</p>
                            <p className="text-2xl font-bold text-gray-900">{members.length}</p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                        <div className="flex items-center">
                          <SafeIcon icon={FiDollarSign} className="h-8 w-8 text-green-600" />
                          <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                            <p className="text-2xl font-bold text-gray-900">
                              £{payments.reduce((sum, payment) => sum + payment.amount, 0)}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                        <div className="flex items-center">
                          <SafeIcon icon={FiUsers} className="h-8 w-8 text-purple-600" />
                          <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Family Members</p>
                            <p className="text-2xl font-bold text-gray-900">{familyMembers.length}</p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                        <div className="flex items-center">
                          <SafeIcon icon={FiTrendingUp} className="h-8 w-8 text-indigo-600" />
                          <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Active Members</p>
                            <p className="text-2xl font-bold text-gray-900">
                              {members.filter(m => m.membershipStatus === 'active').length}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {selectedReport === 'deaths' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Death Records</h3>
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Household</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Death Reported</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Funeral Status</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            {familyMembers
                              .filter(member => member.isDeceased)
                              .map((member) => (
                                <tr key={member.id}>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                      <div className="text-sm font-medium text-gray-900">
                                        {member.firstName} {member.lastName}
                                      </div>
                                    </div>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{member.householdId}</div>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">
                                      {member.deathReportedDate ? new Date(member.deathReportedDate).toLocaleDateString() : 'N/A'}
                                    </div>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                      member.funeralArranged
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-yellow-100 text-yellow-800'
                                    }`}>
                                      {member.funeralArranged ? 'Arranged' : 'Pending'}
                                    </span>
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                      {familyMembers.filter(member => member.isDeceased).length === 0 && (
                        <div className="text-center py-8">
                          <p className="text-gray-500">No death records found.</p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}

                {selectedReport === 'members' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Membership Statistics</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                          <p className="text-2xl font-bold text-green-600">
                            {members.filter(m => m.membershipStatus === 'active').length}
                          </p>
                          <p className="text-sm text-gray-600">Active Members</p>
                        </div>
                        <div className="text-center p-4 bg-yellow-50 rounded-lg">
                          <p className="text-2xl font-bold text-yellow-600">
                            {members.filter(m => m.membershipStatus === 'pending').length}
                          </p>
                          <p className="text-sm text-gray-600">Pending Members</p>
                        </div>
                        <div className="text-center p-4 bg-red-50 rounded-lg">
                          <p className="text-2xl font-bold text-red-600">
                            {members.filter(m => m.membershipStatus === 'expired').length}
                          </p>
                          <p className="text-sm text-gray-600">Expired Members</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {selectedReport === 'payments' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Analysis</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                          <p className="text-2xl font-bold text-blue-600">
                            £{payments.reduce((sum, payment) => sum + payment.amount, 0)}
                          </p>
                          <p className="text-sm text-gray-600">Total Revenue</p>
                        </div>
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                          <p className="text-2xl font-bold text-green-600">
                            {payments.filter(p => p.status === 'completed').length}
                          </p>
                          <p className="text-sm text-gray-600">Completed Payments</p>
                        </div>
                        <div className="text-center p-4 bg-purple-50 rounded-lg">
                          <p className="text-2xl font-bold text-purple-600">
                            £{payments.length > 0 ? Math.round(payments.reduce((sum, payment) => sum + payment.amount, 0) / payments.length) : 0}
                          </p>
                          <p className="text-sm text-gray-600">Average Payment</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminReports;
```