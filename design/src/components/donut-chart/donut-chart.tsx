import React from 'react';
import Chart from 'react-apexcharts';
import { Card, Text } from '@mantine/core';

interface DataItem {
  percentage: string;
  field: string;
}

interface DonutChartProps {
  rows: DataItem[];
  title: string;
  description: string;
}

const DonutChart: React.FC<DonutChartProps> = ({
  rows,
  title,
  description,
}) => {
  // Extracting labels and percentages from the data
  const labels = rows.map((item) => item.field);
  const percentages = rows.map((item) => parseFloat(item.percentage));

  // ApexCharts options
  const options: ApexCharts.ApexOptions = {
    labels: labels,
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  };

  // ApexCharts series
  const series = percentages;

  return (
    <Card shadow="xs">
      <Text size="md" mt="md">
        {title}
      </Text>
      <Text fz={12} c={'dimmed'}>
        {description}
      </Text>
      <Chart options={options} series={series} type="donut" height={300} />
    </Card>
  );
};

export default DonutChart;
