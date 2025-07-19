import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import Header from '../../components/common/Header';
import Navigation from '../../components/common/Navigation';
import SafeIcon from '../../components/common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiCreditCard, FiDollarSign, FiCalendar, FiCheck, FiClock, FiDownload, FiPlus } = FiIcons;

const Payments = () => {
  const { user } = useAuth();
  const { payments, addPayment, settings } = useData();
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('stripe');
  const [loading, setLoading] = useState(false);

  const userPayments = payments.filter(payment => payment.memberId === user?.id);
  const sortedPayments = userPayments.sort((a, b) => new Date(b.date) - new Date(a.date));

  const handlePayment = async (amount, method) => {
    setLoading(true);
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      addPayment({
        memberId: user?.id,
        amount: amount,
        status: 'completed',
        method: method,
        transactionId: `txn_${Date.now()}`
      });
      
      toast.success('Payment successful!');
      setShowPaymentForm(false);
    } catch (error) {
      toast.error('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const downloadReceipt = (payment) => {
    // Simulate receipt download
    toast.info('Receipt downloaded successfully');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Payments" />
      
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
                  <h1 className="text-3xl font-bold text-gray-900">Payments</h1>
                  <p className="text-gray-600 mt-2">Manage your membership payments</p>
                </div>
                <button
                  onClick={() => setShowPaymentForm(true)}
                  className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  <SafeIcon icon={FiPlus} className="h-4 w-4 mr-2" />
                  Make Payment
                </button>
              </div>

              {/* Payment Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                  <div className="flex items-center">
                    <div className="p-3 rounded-lg bg-green-50">
                      <SafeIcon icon={FiDollarSign} className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Total Paid</p>
                      <p className="text-2xl font-bold text-gray-900">
                        £{userPayments.reduce((sum, payment) => sum + payment.amount, 0)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                  <div className="flex items-center">
                    <div className="p-3 rounded-lg bg-blue-50">
                      <SafeIcon icon={FiCalendar} className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Membership Expires</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {user?.membershipExpiry || 'N/A'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                  <div className="flex items-center">
                    <div className="p-3 rounded-lg bg-purple-50">
                      <SafeIcon icon={FiCreditCard} className="h-6 w-6 text-purple-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Annual Fee</p>
                      <p className="text-2xl font-bold text-gray-900">
                        £{settings.membershipFee}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Form Modal */}
              {showPaymentForm && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
                >
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-white rounded-lg shadow-xl max-w-md w-full p-6"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Make Payment
                    </h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Payment Amount
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-500">£</span>
                          </div>
                          <input
                            type="number"
                            value={settings.membershipFee}
                            readOnly
                            className="block w-full pl-8 pr-3 py-3 border border-gray-300 rounded-lg bg-gray-50 sm:text-sm"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Payment Method
                        </label>
                        <div className="space-y-2">
                          <label className="flex items-center">
                            <input
                              type="radio"
                              value="stripe"
                              checked={selectedPaymentMethod === 'stripe'}
                              onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                            />
                            <span className="ml-2 text-sm text-gray-700">Stripe (Card Payment)</span>
                          </label>
                          <label className="flex items-center">
                            <input
                              type="radio"
                              value="paypal"
                              checked={selectedPaymentMethod === 'paypal'}
                              onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                            />
                            <span className="ml-2 text-sm text-gray-700">PayPal</span>
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-3 mt-6">
                      <button
                        onClick={() => setShowPaymentForm(false)}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handlePayment(settings.membershipFee, selectedPaymentMethod)}
                        disabled={loading}
                        className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        {loading ? 'Processing...' : 'Pay Now'}
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              )}

              {/* Payment History */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Payment History
                  </h3>

                  {sortedPayments.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Date
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
                              Receipt
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {sortedPayments.map((payment) => (
                            <tr key={payment.id} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {new Date(payment.date).toLocaleDateString()}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                £{payment.amount}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">
                                {payment.method}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  payment.status === 'completed' 
                                    ? 'bg-green-100 text-green-800' 
                                    : payment.status === 'pending'
                                    ? 'bg-yellow-100 text-yellow-800'
                                    : 'bg-red-100 text-red-800'
                                }`}>
                                  <SafeIcon 
                                    icon={payment.status === 'completed' ? FiCheck : FiClock} 
                                    className="h-3 w-3 mr-1" 
                                  />
                                  {payment.status}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                <button
                                  onClick={() => downloadReceipt(payment)}
                                  className="text-primary-600 hover:text-primary-700 font-medium"
                                >
                                  <SafeIcon icon={FiDownload} className="h-4 w-4" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <SafeIcon icon={FiCreditCard} className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No payments yet</h3>
                      <p className="text-gray-600 mb-4">
                        Make your first payment to activate your membership.
                      </p>
                      <button
                        onClick={() => setShowPaymentForm(true)}
                        className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                      >
                        <SafeIcon icon={FiPlus} className="h-4 w-4 mr-2" />
                        Make First Payment
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

export default Payments;