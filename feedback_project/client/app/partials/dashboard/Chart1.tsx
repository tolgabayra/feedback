import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const labels = [
  'Ocak',
  'Şubat',
  'Mart',
  'Nisan',
  'Mayıs',
  'Haziran',
  'Temmuz',
  'Ağustos',
  'Eylül',
  'Ekim',
  'Kasım',
  'Aralık',
];

export default function Chart1({ props }: any) {
  const [feedbackCountsByMonth, setFeedbackCountsByMonth] = useState<{ [key: string]: number }>({});
  
  
  useEffect(() => {
    if (props && props.Tebrik) {
      const feedbackData = [props.Tebrik, props.Şikayet, props.Öneri, props.İstek];
      const allFeedbackDates: string[] = [];

      feedbackData.forEach((feedback: any) => {
        const dates = feedback.Dates;
        allFeedbackDates.push(...dates);
      });

      const countsByMonth: { [key: string]: number } = {};

      allFeedbackDates.forEach((date: string) => {
        const month = new Date(date).toLocaleString('default', { month: 'long' });
        countsByMonth[month] = (countsByMonth[month] || 0) + 1;
      });

      setFeedbackCountsByMonth(countsByMonth);
    }
  }, [props]);

  const labels = Object.keys(feedbackCountsByMonth);
  const data = Object.values(feedbackCountsByMonth);
  

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Toplam Geri Bildirim',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: data,
      },
    ],
  };

  return <Line height={30} width={100} data={chartData} />;
}
