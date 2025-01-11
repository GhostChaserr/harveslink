import { Card, Text } from '@mantine/core';
import React, { FC } from 'react';
import ApexCharts from 'react-apexcharts';

export interface DataItem {
  field: string;
  total: number;
}

export type BarChartProps = {
  data: DataItem[] | [];
  title: string;
};

const BarChart: FC<BarChartProps> = ({ title, data }) => {
  // Series data for ApexCharts
  const series = [
    {
      name: 'Total',
      data: data.map((item) => item.total),
    },
  ];

  return (
    <Card shadow="sm">
      <Text c="dimmed" size="md" mt="md">
        {title}
      </Text>

      <ApexCharts
        options={{
          chart: {
            type: 'bar',
          },
          xaxis: {
            categories: data.map((item) => item.field),
          },
          plotOptions: {
            bar: {
              horizontal: false,
            },
          },
        }}
        series={series}
        type="bar"
        height={350}
      />
    </Card>
  );
};

export default BarChart;
