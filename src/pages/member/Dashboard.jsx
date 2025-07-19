import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import Header from '../../components/common/Header';
import Navigation from '../../components/common/Navigation';
import SafeIcon from '../../components/common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiUser, FiUsers, FiCreditCard, FiCalendar, FiCheck, FiAlertCircle, FiDollarSign } = FiIcons;

const Dashboard = () => {
  const { user } = useAuth();
  const { familyMembers, payments } = useData();

  const userFamilyMembers = familyMembers.filter(member => member.householdId === user?.householdId);
  const userPayments = payments.filter(payment => payment.memberId === user?.id);
  const lastPayment = userPayments.sort((a, b) => new Date(b.date) - new Date(a.date))[0];

  const stats = [
    {
      title: 'Membership Status',
      value: user?.membershipStatus === 'active' ? 'Active' : 'Pending',
      icon: FiCheck,
      color: user?.membershipStatus === 'active' ? 'text-green-600' : 'text-yellow-600',
      bgColor: user?.membershipStatus === 'active' ? 'bg-green-50' : 'bg-yellow-50'
    },
    {
      title: 'Family Members',
      value: userFamilyMembers.length,
      icon: FiUsers,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Last Payment',
      value: lastPayment ? `£${lastPayment.amount}` : 'No payments',
      icon: FiDollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Membership Expires',
      value: user?.membershipExpiry || 'Not set',
      icon: FiCalendar,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  const quickActions = [
    {
      title: 'Update Profile',
      description: 'Edit your personal information',
      icon: FiUser,
      link: '/member/profile',
      color: 'bg-blue-500'
    },
    {
      title: 'Manage Family',
      description: 'Add or edit family members',
      icon: FiUsers,
      link: '/member/family',
      color: 'bg-green-500'
    },
    {
      title: 'View Payments',
      description: 'Check payment history',
      icon: FiCreditCard,
      link: '/member/payments',
      color: 'bg-purple-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Dashboard" />
      
      <div className="flex">
        <Navigation />
        
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Welcome Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome back, {user?.name}
              </h1>
              <p className="text-gray-600">
                Manage your FIFC membership and family information
              </p>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
            >
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
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {quickActions.map((action, index) => (
                  <Link
                    key={index}
                    to={action.link}
                    className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow group"
                  >
                    <div className="flex items-center mb-4">
                      <div className={`p-3 rounded-lg ${action.color} text-white`}>
                        <SafeIcon icon={action.icon} className="h-6 w-6" />
                      </div>
                      <h3 className="ml-4 text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                        {action.title}
                      </h3>
                    </div>
                    <p className="text-gray-600">{action.description}</p>
                  </Link>
                ))}
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              {/* Recent Payments */}
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Payments</h3>
                  <Link to="/member/payments" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                    View All
                  </Link>
                </div>
                {userPayments.length > 0 ? (
                  <div className="space-y-3">
                    {userPayments.slice(0, 3).map((payment) => (
                      <div key={payment.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                        <div>
                          <p className="font-medium text-gray-900">£{payment.amount}</p>
                          <p className="text-sm text-gray-600">{payment.date}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          payment.status === 'completed' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {payment.status}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">No payments yet</p>
                )}
              </div>

              {/* Family Members */}
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Family Members</h3>
                  <Link to="/member/family" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                    Manage
                  </Link>
                </div>
                {userFamilyMembers.length > 0 ? (
                  <div className="space-y-3">
                    {userFamilyMembers.slice(0, 3).map((member) => (
                      <div key={member.id} className="flex items-center py-2 border-b border-gray-100 last:border-b-0">
                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                          <SafeIcon icon={FiUser} className="h-4 w-4 text-gray-600" />
                        </div>
                        <div className="ml-3">
                          <p className="font-medium text-gray-900">{member.firstName} {member.lastName}</p>
                          <p className="text-sm text-gray-600 capitalize">{member.relationship}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">No family members added</p>
                )}
              </div>
            </motion.div>

            {/* Membership Renewal Alert */}
            {user?.membershipStatus === 'expired' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4"
              >
                <div className="flex items-center">
                  <SafeIcon icon={FiAlertCircle} className="h-5 w-5 text-yellow-600" />
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800">
                      Membership Renewal Required
                    </h3>
                    <p className="text-sm text-yellow-700 mt-1">
                      Your membership has expired. Please renew to continue accessing services.
                    </p>
                    <Link
                      to="/member/payments"
                      className="inline-flex items-center mt-2 text-sm text-yellow-800 font-medium hover:text-yellow-900"
                    >
                      Renew Membership →
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;