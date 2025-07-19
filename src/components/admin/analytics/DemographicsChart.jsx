```jsx
import React from 'react';
import ReactECharts from 'echarts-for-react';
import { useData } from '../../../context/DataContext';

const DemographicsChart = () => {
  const { familyMembers } = useData();

  // Calculate relationship distribution
  const relationshipCounts = familyMembers.reduce((acc, member) => {
    acc[member.relationship] = (acc[member.relationship] || 0) + 1;
    return acc;
  }, {});

  const relationships = Object.keys(relationshipCounts);
  const counts = relationships.map(rel => ({
    value: relationshipCounts[rel],
    name: rel.charAt(0).toUpperCase() + rel.slice(1)
  }));

  const option = {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      right: 10,
      top: 'center'
    },
    series: [
      {
        name: 'Family Relationships',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '16',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: counts
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

export default DemographicsChart;
```