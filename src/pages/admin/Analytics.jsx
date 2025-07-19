```jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useData } from '../../context/DataContext';
import Header from '../../components/common/Header';
import Navigation from '../../components/common/Navigation';
import MembershipChart from '../../components/admin/analytics/MembershipChart';
import PaymentAnalytics from '../../components/admin/analytics/PaymentAnalytics';
import DemographicsChart from '../../components/admin/analytics/DemographicsChart';
import SafeIcon from '../../components/common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiTrendingUp, FiUsers, FiDollarSign } = FiIcons;

const Analytics = () => {
  const { members, payments, familyMembers } = useData();

  const totalRevenue = payments.reduce((sum, payment) => sum + payment.amount, 0);
  const activeMembers = members.filter(m => m.membershipStatus === 'active').length;
  const totalFamilyMembers = familyMembers.length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Analytics" isAdmin={true} />
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
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
                <p className="text-gray-600 mt-2">
                  Comprehensive insights into membership and financial data
                </p>
              </div>

              {/* Summary Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                  <div className="flex items-center">
                    <div className="p-3 rounded-lg bg-blue-50">
                      <SafeIcon icon={FiUsers} className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Active Members</p>
                      <p className="text-2xl font-bold text-gray-900">{activeMembers}</p>
                    </div>
                  </div>
                </div>

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
                    <div className="p-3 rounded-lg bg-purple-50">
                      <SafeIcon icon={FiTrendingUp} className="h-6 w-6 text-purple-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Family Members</p>
                      <p className="text-2xl font-bold text-gray-900">{totalFamilyMembers}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Charts */}
              <div className="space-y-6">
                {/* Membership Trends */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Membership Growth Trends
                  </h2>
                  <MembershipChart />
                </div>

                {/* Payment Analytics */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Payment Analytics
                  </h2>
                  <PaymentAnalytics />
                </div>

                {/* Demographics */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Family Demographics
                  </h2>
                  <DemographicsChart />
                </div>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Analytics;
```