```jsx
import React from 'react';
import ReactECharts from 'echarts-for-react';
import { useData } from '../../../context/DataContext';
import { format, parseISO, startOfMonth, endOfMonth } from 'date-fns';

const PaymentAnalytics = () => {
  const { payments } = useData();

  // Group payments by month
  const monthlyPayments = payments.reduce((acc, payment) => {
    const monthKey = format(parseISO(payment.date), 'MMM yyyy');
    if (!acc[monthKey]) {
      acc[monthKey] = {
        total: 0,
        count: 0
      };
    }
    acc[monthKey].total += payment.amount;
    acc[monthKey].count += 1;
    return acc;
  }, {});

  const months = Object.keys(monthlyPayments).slice(-6);
  const totals = months.map(month => monthlyPayments[month].total);
  const counts = months.map(month => monthlyPayments[month].count);

  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['Total Revenue', 'Number of Payments']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: months,
      axisLabel: {
        rotate: 45
      }
    },
    yAxis: [
      {
        type: 'value',
        name: 'Revenue (£)',
        position: 'left'
      },
      {
        type: 'value',
        name: 'Number of Payments',
        position: 'right'
      }
    ],
    series: [
      {
        name: 'Total Revenue',
        type: 'bar',
        data: totals,
        itemStyle: {
          color: '#3674ff'
        }
      },
      {
        name: 'Number of Payments',
        type: 'line',
        yAxisIndex: 1,
        data: counts,
        itemStyle: {
          color: '#10b981'
        }
      }
    ]
  };

  return (
    <ReactECharts
      option={option}
      style={{ height: '400px', width: '100%' }}
      className="bg-white rounded-lg shadow-sm p-4"
    />
  );
};

export default PaymentAnalytics;
```