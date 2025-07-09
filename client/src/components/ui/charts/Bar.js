import React from 'react'

import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStats } from '../../../features/stats/StatSlice';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


const BarChart = () => {

    const dispatch = useDispatch();
    const { allStats } = useSelector((state) => state.stats);
    const labels = allStats.map(stat => stat.month);
    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Toplam Gelir',
                data: allStats.map(stat => stat.totalRevenue),
                backgroundColor: 'rgba(255, 183, 50, 0.5)',
                borderColor: '#FFB732',
                borderWidth: 1,
                maxBarThickness: 30
            }
        ]
    };
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: false,
                text: 'Aylık Gelir Dağılımı',
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Tarih'
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Gelir (₺)'
                }
            }
        }
    };



  return (
    <div className="w-full h-auto mx-auto align-center flex justify-center">
        <Bar data={data} options={options} />
        
    </div>
  )
}

export default BarChart