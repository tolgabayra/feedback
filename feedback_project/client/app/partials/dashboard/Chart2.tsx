import React, { useState } from 'react';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Chart2({ props }: any) {
  const updatedData = {
    labels: ['Şikayet', 'Öneri', 'İstek', 'Tebrik'],
    datasets: [
      {
        label: 'Toplam Sayı',
        data: [props?.Şikayet, props?.Öneri, props?.İstek, props?.Tebrik],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  return <Doughnut data={updatedData} />;
}
