import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useData } from '../../context/DataContext';
import Header from '../../components/common/Header';
import Navigation from '../../components/common/Navigation';
import SafeIcon from '../../components/common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiSearch, FiFilter, FiDownload, FiDollarSign, FiCalendar, FiCheck, FiClock, FiX } = FiIcons;

const AdminPayments = () => {
  const { payments, members } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [methodFilter, setMethodFilter] = useState('all');

  const filteredPayments = payments.filter(payment => {
    const member = members.find(m => m.id === payment.memberId);
    const memberName = member ? `${member.firstName} ${member.lastName}` : '';
    
    const matchesSearch = 
      memberName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || payment.status === statusFilter;
    const matchesMethod = methodFilter === 'all' || payment.method === methodFilter;
    
    return matchesSearch && matchesStatus && matchesMethod;
  });

  const totalRevenue = payments.reduce((sum, payment) => sum + payment.amount, 0);
  const completedPayments = payments.filter(p => p.status === 'completed');
  const pendingPayments = payments.filter(p => p.status === 'pending');

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const exportPayments = () => {
    // Simulate export functionality
    const csvContent = [
      ['Date', 'Member', 'Amount', 'Method', 'Status', 'Transaction ID'],
      ...filteredPayments.map(payment => {
        const member = members.find(m => m.id === payment.memberId);
        const memberName = member ? `${member.firstName} ${member.lastName}` : 'Unknown';
        return [
          payment.date,
          memberName,
          `£${payment.amount}`,
          payment.method,
          payment.status,
          payment.transactionId
        ];
      })
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'payments-export.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Payments Management" isAdmin={true} />
      
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
                  <h1 className="text-3xl font-bold text-gray-900">Payments Management</h1>
                  <p className="text-gray-600 mt-2">Monitor and manage all membership payments</p>
                </div>
                <button
                  onClick={exportPayments}
                  className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  <SafeIcon icon={FiDownload} className="h-4 w-4 mr-2" />
                  Export Data
                </button>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                  <div className="flex items-center">
                    <div className="p-3 rounded-lg bg-green-50">
                      <SafeIcon icon={FiDollarSign} className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                      <p className="text-2xl font-bold text-gray-900">£{totalRevenue}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                  <div className="flex items-center">
                    <div className="p-3 rounded-lg bg-blue-50">
                      <SafeIcon icon={FiCheck} className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Completed</p>
                      <p className="text-2xl font-bold text-gray-900">{completedPayments.length}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                  <div className="flex items-center">
                    <div className="p-3 rounded-lg bg-yellow-50">
                      <SafeIcon icon={FiClock} className="h-6 w-6 text-yellow-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Pending</p>
                      <p className="text-2xl font-bold text-gray-900">{pendingPayments.length}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                  <div className="flex items-center">
                    <div className="p-3 rounded-lg bg-purple-50">
                      <SafeIcon icon={FiCalendar} className="h-6 w-6 text-purple-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">This Month</p>
                      <p className="text-2xl font-bold text-gray-900">
                        £{payments
                          .filter(p => new Date(p.date).getMonth() === new Date().getMonth())
                          .reduce((sum, p) => sum + p.amount, 0)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Filters */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <SafeIcon icon={FiSearch} className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        placeholder="Search payments..."
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
                        <option value="completed">Completed</option>
                        <option value="pending">Pending</option>
                        <option value="failed">Failed</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <SafeIcon icon={FiFilter} className="h-5 w-5 text-gray-400" />
                      </div>
                      <select
                        value={methodFilter}
                        onChange={(e) => setMethodFilter(e.target.value)}
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                      >
                        <option value="all">All Methods</option>
                        <option value="stripe">Stripe</option>
                        <option value="paypal">PayPal</option>
                        <option value="bank">Bank Transfer</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payments Table */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Member
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Amount
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Method
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Transaction ID
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredPayments.map((payment) => {
                        const member = members.find(m => m.id === payment.memberId);
                        const memberName = member ? `${member.firstName} ${member.lastName}` : 'Unknown Member';
                        
                        return (
                          <tr key={payment.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {new Date(payment.date).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {memberName}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              £{payment.amount}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">
                              {payment.method}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(payment.status)}`}>
                                <SafeIcon 
                                  icon={payment.status === 'completed' ? FiCheck : payment.status === 'pending' ? FiClock : FiX} 
                                  className="h-3 w-3 mr-1" 
                                />
                                {payment.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {payment.transactionId}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {filteredPayments.length === 0 && (
                  <div className="text-center py-8">
                    <SafeIcon icon={FiDollarSign} className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No payments found</h3>
                    <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminPayments;