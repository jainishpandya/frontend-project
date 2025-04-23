import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

export default function BasicLineChart() {
  return (
    <div>
      <h1 className='font-bold text-2xl'>How many Book you Read ?</h1>
    < LineChart
      xAxis={[{ data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], label: 'Month',}]}
      yAxis={[{ min: 0, max: 25, label:'Books Read'}]}
      series={[
        {
          data: [1, 2, 4, 6, 8, 10, 13, 16, 18, 20, 24],
          label: 'Books Read in Last 12 Months',
          color: 'var(--color-br-blue-skyblue)'
        },
      ]}
      height={450}
    />
    </div>
  );
}