```jsx
import React from 'react';
import ReactECharts from 'echarts-for-react';
import { useData } from '../../../context/DataContext';
import { format, subMonths, eachMonthOfInterval } from 'date-fns';

const MembershipChart = () => {
  const { members } = useData();

  // Get last 12 months
  const last12Months = eachMonthOfInterval({
    start: subMonths(new Date(), 11),
    end: new Date()
  });

  // Calculate monthly active members
  const monthlyData = last12Months.map(month => {
    const activeMembers = members.filter(member => {
      const membershipDate = new Date(member.joinDate);
      return membershipDate <= month && member.membershipStatus === 'active';
    });
    return {
      month: format(month, 'MMM yyyy'),
      active: activeMembers.length
    };
  });

  const option = {
    tooltip: {
      trigger: 'axis',
      formatter: '{b}: {c} members'
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: monthlyData.map(d => d.month),
      axisLabel: {
        rotate: 45
      }
    },
    yAxis: {
      type: 'value',
      name: 'Active Members'
    },
    series: [
      {
        name: 'Active Members',
        type: 'line',
        smooth: true,
        data: monthlyData.map(d => d.active),
        itemStyle: {
          color: '#3674ff'
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(54, 116, 255, 0.3)' },
              { offset: 1, color: 'rgba(54, 116, 255, 0.1)' }
            ]
          }
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

export default MembershipChart;
```