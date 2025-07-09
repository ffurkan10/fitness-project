import { useEffect } from 'react'
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGenderStats } from '../../../features/stats/StatSlice';

ChartJS.register(ArcElement, Tooltip, Legend);

const Pie = () => {
    const dispatch = useDispatch();
    const {genderStats} = useSelector((state) => state.stats);

    useEffect(() => {
      dispatch(fetchGenderStats())
    }, [])


    const data = {
    labels: ["Erkek", "Kadın"],
    datasets: [
      {
        data: [genderStats?.erkek, genderStats?.kadın],
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

export default Pie