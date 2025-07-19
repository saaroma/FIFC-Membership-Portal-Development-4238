import React from 'react';
import {Link} from 'react-router-dom';
import {motion} from 'framer-motion';
import SafeIcon from '../components/common/SafeIcon';
import {LOGO_URL} from '../config/constants';
import * as FiIcons from 'react-icons/fi';

const {FiUsers,FiHeart,FiPhone}=FiIcons;

const Welcome=()=> {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-br from-primary-50 to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                    <div className="text-center">
                        <motion.div initial={{opacity: 0,y: 20}} animate={{opacity: 1,y: 0}} transition={{duration: 0.6}} >
                            <img src={LOGO_URL} alt="FIFC Logo" className="h-32 w-48 mx-auto mb-8" />
                            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl mb-4">
                                Fife Islamic Funeral Committee
                            </h1>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                                Supporting our community in times of need with compassionate funeral services and assistance
                            </p>
                            <div className="flex justify-center space-x-4">
                                <Link to="/register" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700">
                                    Become a Member
                                </Link>
                                <Link to="/login" className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50">
                                    Member Login
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900">Our Services</h2>
                        <p className="mt-4 text-lg text-gray-600">
                            Comprehensive support for our community members
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <motion.div initial={{opacity: 0,y: 20}} animate={{opacity: 1,y: 0}} transition={{duration: 0.6,delay: 0.2}} className="bg-white rounded-lg p-8 text-center border border-gray-200 hover:shadow-lg transition-shadow">
                            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <SafeIcon icon={FiHeart} className="h-8 w-8 text-primary-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Funeral Services</h3>
                            <p className="text-gray-600">
                                Complete funeral arrangements and support according to Islamic traditions
                            </p>
                        </motion.div>

                        <motion.div initial={{opacity: 0,y: 20}} animate={{opacity: 1,y: 0}} transition={{duration: 0.6,delay: 0.3}} className="bg-white rounded-lg p-8 text-center border border-gray-200 hover:shadow-lg transition-shadow">
                            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <SafeIcon icon={FiUsers} className="h-8 w-8 text-primary-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Community Support</h3>
                            <p className="text-gray-600">
                                Dedicated assistance and guidance for families during difficult times
                            </p>
                        </motion.div>

                        <motion.div initial={{opacity: 0,y: 20}} animate={{opacity: 1,y: 0}} transition={{duration: 0.6,delay: 0.4}} className="bg-white rounded-lg p-8 text-center border border-gray-200 hover:shadow-lg transition-shadow">
                            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <SafeIcon icon={FiPhone} className="h-8 w-8 text-primary-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">24/7 Assistance</h3>
                            <p className="text-gray-600">
                                Round-the-clock emergency support and consultation services
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-100 border-t border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="col-span-1 md:col-span-2">
                            <img src={LOGO_URL} alt="FIFC Logo" className="h-16 w-24 object-contain mb-4" />
                            <p className="text-gray-600 mb-4">
                                Providing compassionate funeral services and community support for Muslim families across Fife and surrounding areas.
                            </p>
                            <div className="text-sm text-gray-500">
                                © {new Date().getFullYear()} FIFC. All rights reserved.
                            </div>
                        </div>

                        <div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h4>
                            <ul className="space-y-2">
                                <li><Link to="/register" className="text-gray-600 hover:text-primary-600">Become a Member</Link></li>
                                <li><Link to="/login" className="text-gray-600 hover:text-primary-600">Member Portal</Link></li>
                                <li><Link to="/admin/login" className="text-gray-600 hover:text-primary-600">Admin Login</Link></li>
                                <li><a href="#" className="text-gray-600 hover:text-primary-600">Services</a></li>
                                <li><a href="#" className="text-gray-600 hover:text-primary-600">Contact Us</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-4">Contact Info</h4>
                            <div className="space-y-2 text-sm text-gray-600">
                                <p>Emergency: +44 1383 123456</p>
                                <p>Email: info@fifc.org.uk</p>
                                <p>Serving Fife & Surrounding Areas</p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Welcome;