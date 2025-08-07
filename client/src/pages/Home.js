import React from 'react'
import QuickAccess from '../components/dashboard/QuickAccess'
import Pie from '../components/ui/charts/Pie'
import BarChart from '../components/ui/charts/Bar'
import LineChart from '../components/ui/charts/Line'
import DoughnutChart from '../components/ui/charts/Doughnut'

const Home = () => {
  return (
    <section className='w-full h-full'>
      <QuickAccess />

      <div className='w-full mt-10 bg-background'>
        <div className='flex justify-between items-center gap-5'>

          <div className='w-1/2 h-auto flex flex-col justify-between gap-5 mt-5 rounded-lg p-5 bg-white border border-light'>
            <div className='text-lg font-semibold text-dark'>Üye Dağılımı</div>
            <LineChart />
          </div>
        
          <div className='w-1/2 h-auto flex flex-col justify-between gap-5 mt-5 rounded-lg p-5 bg-white border border-light'>
            <div className='text-lg font-semibold text-dark'>Aylık Gelir Dağılımı</div>
            <BarChart />
          </div>
        </div>

        <div className='flex justify-between items-center gap-5 mt-5'>

          <div className='w-1/3 h-auto flex flex-col justify-between gap-5 mt-5 rounded-lg p-5 bg-white border border-light'>
            <div className='text-lg font-semibold text-dark'>Cinsiyet Dağılımı</div>
            <Pie />
          </div>

          <div className='w-1/3 h-auto flex flex-col justify-between gap-5 mt-5 rounded-lg p-5 bg-white border border-light'>
            <div className='text-lg font-semibold text-dark'>Ders Tipi Dağılımı</div>
            <DoughnutChart />
          </div>

          {/* <div className='w-1/3 h-auto flex flex-col justify-between gap-5 mt-5 rounded-lg p-5 bg-white shadow-card'>
            <div className='text-lg font-semibold text-dark'>Cinsiyet Dağılımı</div>
            <Pie />
          </div> */}

          
        </div>
      </div>
    </section>
  )
}

export default Home