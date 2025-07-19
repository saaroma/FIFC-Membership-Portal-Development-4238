```jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useData } from '../../context/DataContext';
import Header from '../../components/common/Header';
import Navigation from '../../components/common/Navigation';
import SafeIcon from '../../components/common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiUsers, FiDollarSign, FiCalendar, FiTrendingUp, FiCheck, FiClock, FiX } = FiIcons;

const AdminDashboard = () => {
  const { members, payments, familyMembers } = useData();
  const navigate = useNavigate();

  const stats = [
    {
      title: 'Total Members',
      value: members.length,
      icon: FiUsers,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Active Members',
      value: members.filter(m => m.membershipStatus === 'active').length,
      icon: FiCheck,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Total Revenue',
      value: `£${payments.reduce((sum, payment) => sum + payment.amount, 0)}`,
      icon: FiDollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Family Members',
      value: familyMembers.length,
      icon: FiUsers,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  const recentMembers = members.slice(0, 5);
  const recentPayments = payments.slice(0, 5);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Admin Dashboard" isAdmin={true} />
      <div className="flex">
        <Navigation isAdmin={true} />
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Welcome Section */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Welcome to Admin Dashboard
                </h1>
                <p className="text-gray-600">
                  Manage FIFC members, payments, and system settings
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                    <div className="flex items-center">
                      <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                        <SafeIcon icon={stat.icon} className={`h-6 w-6 ${stat.color}`} />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Members */}
                <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Recent Members</h3>
                    <Link to="/admin/members" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                      View All
                    </Link>
                  </div>
                  <div className="space-y-3">
                    {recentMembers.map((member) => (
                      <div 
                        key={member.id} 
                        className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0 cursor-pointer hover:bg-gray-50"
                        onClick={() => navigate(`/admin/members?id=${member.id}`)}
                      >
                        <div>
                          <p className="font-medium text-gray-900">{member.firstName} {member.lastName}</p>
                          <p className="text-sm text-gray-600">{member.email}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          member.membershipStatus === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : member.membershipStatus === 'pending' 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {member.membershipStatus}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Payments */}
                <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Recent Payments</h3>
                    <Link to="/admin/payments" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                      View All
                    </Link>
                  </div>
                  <div className="space-y-3">
                    {recentPayments.map((payment) => (
                      <div 
                        key={payment.id} 
                        className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0 cursor-pointer hover:bg-gray-50"
                        onClick={() => navigate(`/admin/payments?id=${payment.id}`)}
                      >
                        <div>
                          <p className="font-medium text-gray-900">£{payment.amount}</p>
                          <p className="text-sm text-gray-600">{payment.date}</p>
                        </div>
                        <div className="text-right">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            payment.status === 'completed' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {payment.status}
                          </span>
                          <p className="text-xs text-gray-500 mt-1">{payment.method}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Link
                    to="/admin/members"
                    className="bg-white rounded-lg shadow-sm p-4 border border-gray-200 hover:shadow-md transition-shadow text-center"
                  >
                    <SafeIcon icon={FiUsers} className="h-8 w-8 text-primary-600 mx-auto mb-2" />
                    <p className="font-medium text-gray-900">Manage Members</p>
                  </Link>
                  <Link
                    to="/admin/payments"
                    className="bg-white rounded-lg shadow-sm p-4 border border-gray-200 hover:shadow-md transition-shadow text-center"
                  >
                    <SafeIcon icon={FiDollarSign} className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <p className="font-medium text-gray-900">View Payments</p>
                  </Link>
                  <Link
                    to="/admin/reports"
                    className="bg-white rounded-lg shadow-sm p-4 border border-gray-200 hover:shadow-md transition-shadow text-center"
                  >
                    <SafeIcon icon={FiTrendingUp} className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <p className="font-medium text-gray-900">View Reports</p>
                  </Link>
                  <Link
                    to="/admin/settings"
                    className="bg-white rounded-lg shadow-sm p-4 border border-gray-200 hover:shadow-md transition-shadow text-center"
                  >
                    <SafeIcon icon={FiCalendar} className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                    <p className="font-medium text-gray-900">Settings</p>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
```