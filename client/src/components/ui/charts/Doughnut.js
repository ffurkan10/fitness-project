import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { useDispatch, useSelector } from 'react-redux';

ChartJS.register(ArcElement, Tooltip, Legend);


const DoughnutChart = () => {
    const {lastMonthStats} = useSelector((state) => state.stats);

    const data = {
    labels: ['Bireysel', 'Grup'],
    datasets: [
      {
        data: [lastMonthStats?.personalTrainingCount, lastMonthStats?.groupTrainingCount],
        backgroundColor: ['rgba(60, 62, 64, 0.8)', 'rgba(255, 183, 50, 0.8)'], // Erkek, Kadın
        borderColor: ['#ffffff', '#ffffff'],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    cutout: '70%', // Donut görünümü
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };

  return (
    <div className="w-full h-64 mx-auto align-center flex justify-center">
      <Doughnut data={data} options={options} />
    </div>
  )
}

export default DoughnutChart