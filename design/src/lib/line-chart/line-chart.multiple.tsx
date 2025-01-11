import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { Card, Text } from '@mantine/core';

interface DataItem {
  Date: string;
  Total: number;
  Domain: string;
}

interface SeriesItem {
  name: string;
  data: { x: string; y: number }[];
}

const generateDateRange = (startDate: string, endDate: string): string[] => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const dateRange: string[] = [];
  for (let d = start; d <= end; d.setDate(d.getDate() + 1)) {
    dateRange.push(d.toISOString().split('T')[0]);
  }
  return dateRange;
};

const transformData = (data: DataItem[]): SeriesItem[] => {
  const minDate = data.reduce(
    (min, p) => (p.Date < min ? p.Date : min),
    data[0].Date
  );
  const maxDate = data.reduce(
    (max, p) => (p.Date > max ? p.Date : max),
    data[0].Date
  );
  const dateRange = generateDateRange(minDate, maxDate);

  const seriesMap: { [key: string]: { [date: string]: number } } = {};

  // Initialize all dates with zero for each domain
  data.forEach((item) => {
    if (!seriesMap[item.Domain]) {
      seriesMap[item.Domain] = {};
      dateRange.forEach((date) => (seriesMap[item.Domain][date] = 0));
    }
  });

  // Aggregate totals by domain and date
  data.forEach((item) => {
    seriesMap[item.Domain][item.Date] += item.Total;
  });

  // Convert to series format for ApexCharts
  const series: SeriesItem[] = [];
  for (const domain in seriesMap) {
    const dataSeries = Object.entries(seriesMap[domain]).map(
      ([date, total]) => ({ x: date, y: total })
    );
    series.push({ name: domain, data: dataSeries });
  }

  return series;
};

const options: ApexOptions = {
  chart: {
    type: 'line',
    height: 350,
  },
  stroke: {
    curve: 'smooth',
  },

  dataLabels: {
    enabled: true,
    formatter: function (val: number) {
      return val.toFixed(0); // Format the label as needed
    },
  },
  legend: {
    show: true,
    showForSingleSeries: true,
    onItemClick: {
      toggleDataSeries: true,
    },
    onItemHover: {
      highlightDataSeries: true,
    },
  },
};

const MyLineChart: React.FC<{
  description: string;
  title: string;
  data: DataItem[];
}> = ({ data, title, description }) => {
  const series = data.length > 0 ? transformData(data) : [];
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
        series={series}
        type="line"
        height={350}
      />
    </Card>
  );
};

export default MyLineChart;
