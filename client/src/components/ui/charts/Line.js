import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement
} from 'chart.js';
import { useDispatch, useSelector } from 'react-redux';

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement, 
  Title,
  Tooltip,
  Legend
);


const LineChart = () => {

    const dispatch = useDispatch();
    const { allStats } = useSelector((state) => state.stats);
    const labels = allStats.map(stat => stat.month);
    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Toplam Üye',
                data: allStats.map(stat => stat.totalUsers),
                backgroundColor: 'rgba(255, 183, 50, 0.5)',
                borderColor: '#FFB732',
                borderWidth: 2,
                fill: true,
                tension: 0.4,
                pointRadius: 3,
                pointHoverRadius: 6
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
                text: 'Üye Sayısı Dağılımı',
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Tarih'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Üye Sayısı'
                },
                ticks: {
                    precision: 0,
                    beginAtZero: true
                }

            },
        }
    };

  return (
    <div className="w-full h-auto mx-auto align-center flex justify-center">
        <Line data={data} options={options} />
    </div>
  )
}

export default LineChart