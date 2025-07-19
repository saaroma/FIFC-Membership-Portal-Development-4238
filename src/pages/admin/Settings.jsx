```jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useData } from '../../context/DataContext';
import { toast } from 'react-toastify';
import Header from '../../components/common/Header';
import Navigation from '../../components/common/Navigation';
import SafeIcon from '../../components/common/SafeIcon';
import EmailTemplates from '../../components/admin/EmailTemplates';
import * as FiIcons from 'react-icons/fi';

const { FiSave, FiPlus, FiTrash2, FiSettings } = FiIcons;

const AdminSettings = () => {
  const { settings, updateSettings } = useData();
  const [loading, setLoading] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  const handleSettingsUpdate = async (updates) => {
    setLoading(true);
    try {
      await updateSettings(updates);
      toast.success('Settings updated successfully');
    } catch (error) {
      toast.error('Failed to update settings');
    } finally {
      setLoading(false);
    }
  };

  const handleAddCategory = () => {
    const newCategory = {
      id: Date.now(),
      name: '',
      fee: 0
    };
    setEditingCategory(newCategory);
  };

  const handleSaveCategory = (category) => {
    const updatedCategories = editingCategory.id
      ? settings.categories.map(c => c.id === editingCategory.id ? category : c)
      : [...settings.categories, { ...category, id: Date.now() }];

    handleSettingsUpdate({
      ...settings,
      categories: updatedCategories
    });
    setEditingCategory(null);
  };

  const handleDeleteCategory = (categoryId) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      const updatedCategories = settings.categories.filter(c => c.id !== categoryId);
      handleSettingsUpdate({
        ...settings,
        categories: updatedCategories
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Settings" isAdmin={true} />
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
                  <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
                  <p className="text-gray-600 mt-2">Manage system settings and configurations</p>
                </div>
              </div>

              {/* Membership Settings */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Membership Settings</h2>
                
                <div className="space-y-6">
                  {/* Standard Membership Fee */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Standard Membership Fee (£)
                    </label>
                    <div className="max-w-xs">
                      <input
                        type="number"
                        value={settings.membershipFee}
                        onChange={(e) => handleSettingsUpdate({ ...settings, membershipFee: Number(e.target.value) })}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  {/* Membership Categories */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium text-gray-900">Membership Categories</h3>
                      <button
                        onClick={handleAddCategory}
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
                      >
                        <SafeIcon icon={FiPlus} className="h-4 w-4 mr-2" />
                        Add Category
                      </button>
                    </div>

                    <div className="space-y-4">
                      {settings.categories.map((category) => (
                        <div
                          key={category.id}
                          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                        >
                          <div>
                            <h4 className="font-medium text-gray-900">{category.name}</h4>
                            <p className="text-sm text-gray-600">£{category.fee}</p>
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => setEditingCategory(category)}
                              className="p-2 text-gray-400 hover:text-primary-600"
                            >
                              <SafeIcon icon={FiSettings} className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => handleDeleteCategory(category.id)}
                              className="p-2 text-gray-400 hover:text-red-600"
                            >
                              <SafeIcon icon={FiTrash2} className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Email Templates */}
              <div className="mb-8">
                <EmailTemplates />
              </div>

              {/* Save Button */}
              <div className="flex justify-end">
                <button
                  onClick={() => handleSettingsUpdate(settings)}
                  disabled={loading}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  <SafeIcon icon={FiSave} className="h-4 w-4 mr-2" />
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminSettings;
```