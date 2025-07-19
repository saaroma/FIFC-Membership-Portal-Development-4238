```jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiMail, FiSave, FiEdit } = FiIcons;

const EmailTemplates = () => {
  const [editingTemplate, setEditingTemplate] = useState(null);
  const { register, handleSubmit, reset } = useForm();

  const defaultTemplates = {
    membershipAccepted: {
      subject: 'Welcome to FIFC - Membership Accepted',
      body: `Dear {memberName},

We are pleased to inform you that your FIFC membership application has been accepted. Your membership is now active.

Membership Details:
- Membership ID: {memberId}
- Expiry Date: {expiryDate}

Thank you for joining our community.

Best regards,
FIFC Team`
    },
    membershipExpiring: {
      subject: 'FIFC Membership Expiring Soon',
      body: `Dear {memberName},

Your FIFC membership will expire on {expiryDate}. To ensure continuous access to our services, please renew your membership before the expiry date.

To renew, please log in to your account and visit the payments section.

Best regards,
FIFC Team`
    },
    membershipExpired: {
      subject: 'FIFC Membership Expired',
      body: `Dear {memberName},

Your FIFC membership has expired. To restore your membership and continue accessing our services, please renew at your earliest convenience.

You can renew your membership by logging into your account and visiting the payments section.

Best regards,
FIFC Team`
    }
  };

  const [templates, setTemplates] = useState(defaultTemplates);

  const onSubmit = (data) => {
    try {
      setTemplates(prev => ({
        ...prev,
        [editingTemplate]: {
          subject: data.subject,
          body: data.body
        }
      }));
      toast.success('Email template updated successfully');
      setEditingTemplate(null);
    } catch (error) {
      toast.error('Failed to update template');
    }
  };

  const handleEdit = (templateKey) => {
    setEditingTemplate(templateKey);
    reset({
      subject: templates[templateKey].subject,
      body: templates[templateKey].body
    });
  };

  const getTemplateName = (key) => {
    switch (key) {
      case 'membershipAccepted': return 'Membership Accepted';
      case 'membershipExpiring': return 'Membership Expiring';
      case 'membershipExpired': return 'Membership Expired';
      default: return key;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Email Templates</h3>
        <SafeIcon icon={FiMail} className="h-5 w-5 text-gray-400" />
      </div>

      <div className="space-y-4">
        {Object.keys(templates).map((templateKey) => (
          <div key={templateKey} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-md font-medium text-gray-900">
                {getTemplateName(templateKey)}
              </h4>
              <button
                onClick={() => handleEdit(templateKey)}
                className="text-primary-600 hover:text-primary-700"
              >
                <SafeIcon icon={FiEdit} className="h-4 w-4" />
              </button>
            </div>

            {editingTemplate === templateKey ? (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    {...register('subject')}
                    type="text"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Body
                  </label>
                  <textarea
                    {...register('body')}
                    rows={10}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  />
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setEditingTemplate(null)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                  >
                    <SafeIcon icon={FiSave} className="h-4 w-4 mr-2 inline" />
                    Save Template
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">Subject:</p>
                <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                  {templates[templateKey].subject}
                </p>
                <p className="text-sm font-medium text-gray-700 mt-4">Body:</p>
                <pre className="text-sm text-gray-600 bg-gray-50 p-2 rounded whitespace-pre-wrap font-sans">
                  {templates[templateKey].body}
                </pre>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmailTemplates;
```