```jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  const [members, setMembers] = useState([]);
  const [payments, setPayments] = useState([]);
  const [familyMembers, setFamilyMembers] = useState([]);
  const [settings, setSettings] = useState({
    membershipFee: 100,
    categories: [
      { id: 1, name: 'Standard Membership', fee: 100 },
      { id: 2, name: 'Senior Membership', fee: 75 },
      { id: 3, name: 'Student Membership', fee: 50 }
    ]
  });

  // Mock data initialization
  useEffect(() => {
    const mockMembers = [
      {
        id: '1',
        householdId: 'HH001',
        firstName: 'Ahmed',
        lastName: 'Khan',
        email: 'ahmed.khan@email.com',
        phone: '+44 7700 900000',
        address: '123 Main Street, Dunfermline, KY11 1AA',
        membershipStatus: 'active',
        membershipExpiry: '2024-12-31',
        joinDate: '2023-01-15',
        category: 'Standard Membership',
        isDeceased: false,
        funeralOrganised: false
      },
      {
        id: '2',
        householdId: 'HH002',
        firstName: 'Fatima',
        lastName: 'Ali',
        email: 'fatima.ali@email.com',
        phone: '+44 7700 900001',
        address: '456 Oak Avenue, Kirkcaldy, KY1 2BB',
        membershipStatus: 'expired',
        membershipExpiry: '2023-12-31',
        joinDate: '2022-06-10',
        category: 'Standard Membership',
        isDeceased: false,
        funeralOrganised: false
      },
      {
        id: '3',
        householdId: 'HH003',
        firstName: 'Mohammed',
        lastName: 'Patel',
        email: 'mohammed.patel@email.com',
        phone: '+44 7700 900002',
        address: '789 Pine Street, Glenrothes, KY7 4CC',
        membershipStatus: 'active',
        membershipExpiry: '2024-10-15',
        joinDate: '2023-04-20',
        category: 'Senior Membership',
        isDeceased: false,
        funeralOrganised: false
      }
    ];

    const mockPayments = [
      {
        id: '1',
        memberId: '1',
        amount: 100,
        date: '2024-01-15',
        status: 'completed',
        method: 'stripe',
        transactionId: 'txn_123456789'
      },
      {
        id: '2',
        memberId: '2',
        amount: 100,
        date: '2023-01-10',
        status: 'completed',
        method: 'paypal',
        transactionId: 'ppl_987654321'
      },
      {
        id: '3',
        memberId: '3',
        amount: 75,
        date: '2023-10-15',
        status: 'completed',
        method: 'bank',
        transactionId: 'bank_567891234'
      }
    ];

    const mockFamilyMembers = [
      {
        id: '1',
        householdId: 'HH001',
        firstName: 'Aisha',
        lastName: 'Khan',
        relationship: 'spouse',
        dateOfBirth: '1985-03-20',
        isDeceased: false,
        deathReportedDate: null,
        funeralArranged: false
      },
      {
        id: '2',
        householdId: 'HH001',
        firstName: 'Omar',
        lastName: 'Khan',
        relationship: 'child',
        dateOfBirth: '2010-07-15',
        isDeceased: false,
        deathReportedDate: null,
        funeralArranged: false
      },
      {
        id: '3',
        householdId: 'HH002',
        firstName: 'Yusuf',
        lastName: 'Ali',
        relationship: 'child',
        dateOfBirth: '2015-04-10',
        isDeceased: false,
        deathReportedDate: null,
        funeralArranged: false
      },
      {
        id: '4',
        householdId: 'HH002',
        firstName: 'Maryam',
        lastName: 'Ali',
        relationship: 'child',
        dateOfBirth: '2018-09-22',
        isDeceased: false,
        deathReportedDate: null,
        funeralArranged: false
      },
      {
        id: '5',
        householdId: 'HH003',
        firstName: 'Zainab',
        lastName: 'Patel',
        relationship: 'spouse',
        dateOfBirth: '1958-11-05',
        isDeceased: false,
        deathReportedDate: null,
        funeralArranged: false
      },
      {
        id: '6',
        householdId: 'HH001',
        firstName: 'Ibrahim',
        lastName: 'Khan',
        relationship: 'parent',
        dateOfBirth: '1950-06-20',
        isDeceased: true,
        deathReportedDate: '2023-12-10',
        funeralArranged: true
      }
    ];

    setMembers(mockMembers);
    setPayments(mockPayments);
    setFamilyMembers(mockFamilyMembers);
  }, []);

  const addMember = (memberData) => {
    const newMember = {
      ...memberData,
      id: Date.now().toString(),
      householdId: `HH${Date.now()}`,
      joinDate: new Date().toISOString().split('T')[0],
      membershipStatus: 'pending',
      isDeceased: false,
      funeralOrganised: false
    };
    setMembers((prev) => [...prev, newMember]);
    return newMember;
  };

  const updateMember = (memberId, updates) => {
    setMembers((prev) =>
      prev.map((member) => (member.id === memberId ? { ...member, ...updates } : member))
    );
  };

  const addPayment = (paymentData) => {
    const newPayment = {
      ...paymentData,
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0]
    };
    setPayments((prev) => [...prev, newPayment]);
    return newPayment;
  };

  const addFamilyMember = (familyMemberData) => {
    const newFamilyMember = {
      ...familyMemberData,
      id: Date.now().toString(),
      isDeceased: false,
      deathReportedDate: null,
      funeralArranged: false
    };
    setFamilyMembers((prev) => [...prev, newFamilyMember]);
    return newFamilyMember;
  };

  const updateFamilyMember = (familyMemberId, updates) => {
    setFamilyMembers((prev) =>
      prev.map((member) => (member.id === familyMemberId ? { ...member, ...updates } : member))
    );
  };

  const deleteFamilyMember = (familyMemberId) => {
    setFamilyMembers((prev) => prev.filter((member) => member.id !== familyMemberId));
  };

  const updateSettings = (newSettings) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const value = {
    members,
    payments,
    familyMembers,
    settings,
    addMember,
    updateMember,
    addPayment,
    addFamilyMember,
    updateFamilyMember,
    deleteFamilyMember,
    updateSettings
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
```