import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { Card, Text } from '@mantine/core';

interface DataItem {
  total: number;
  created_at: string;
}

interface LineChartProps {
  rows: DataItem[];
  title: string;
  description: string;
}

const LineChart: React.FC<LineChartProps> = ({ rows, title, description }) => {
  const dates = rows.map((entry) => entry.created_at);
  const totals = rows.map((entry) => entry.total);

  // Chart options
  const options = {
    series: [
      {
        name: 'Total',
        data: totals,
        curve: 'smooth', // Set the curve property to "smooth"
      },
    ],
    xaxis: {
      categories: dates,
    },
    dataLabels: {
      enabled: true,
      formatter: function (val: number) {
        return val.toFixed(0); // Format the label as needed
      },
    },
  };

  return (
    <Card padding="md" shadow="xs">
      <Text size="md" mt="md">
        {title}
      </Text>
      <Text fz={12} c={'dimmed'}>
        {description}
      </Text>
      <ReactApexChart
        options={options}
        series={options.series}
        type="line"
        height={300}
      />
    </Card>
  );
};

export default LineChart;
