```javascript
import { toast } from 'react-toastify';

export const sendEmail = async (to, templateKey, data) => {
  try {
    // In a real implementation, this would make an API call to your email service
    console.log(`Sending email to ${to} using template ${templateKey}`, data);
    toast.success('Email sent successfully');
    return true;
  } catch (error) {
    console.error('Failed to send email:', error);
    toast.error('Failed to send email');
    return false;
  }
};

export const scheduleExpiryEmails = (members) => {
  // This would be implemented on the backend to schedule automated emails
  members.forEach(member => {
    const expiryDate = new Date(member.membershipExpiry);
    const now = new Date();
    const daysUntilExpiry = Math.ceil((expiryDate - now) / (1000 * 60 * 60 * 24));

    if (daysUntilExpiry === 30) {
      sendEmail(member.email, 'membershipExpiring', {
        memberName: `${member.firstName} ${member.lastName}`,
        expiryDate: member.membershipExpiry
      });
    } else if (daysUntilExpiry === 0) {
      sendEmail(member.email, 'membershipExpired', {
        memberName: `${member.firstName} ${member.lastName}`
      });
    }
  });
};
```