import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { MdSpaceDashboard } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi"; 
import { getAdminProfile, logout } from '../../features/auth/AuthSlice';
import { useDispatch, useSelector } from 'react-redux';
import { IoNotifications } from "react-icons/io5";
import { RiAdminFill } from "react-icons/ri";

const data = [
    {
        id: 1,
        name: 'Ana Sayfa',
        slug: "/",
        icon: MdSpaceDashboard
    },
    {
        id: 2,
        name: 'Üyeler',
        slug: "/uyeler",
        icon: FaUsers
    },
    {
        id: 3,
        name: 'Bildirimler',
        slug: "/bildirimler",
        icon: IoNotifications
    }
]

const Sidebar = () => {
    const path = useLocation().pathname;
    const dispatch = useDispatch();
    const {userProfile} = useSelector(state => state.auth);

    useEffect(() => {
        dispatch(getAdminProfile());
    }, [])

    const handleLogout = () => {
        dispatch(logout())
    }

    return (
        <div className='px-10 py-5 w-80 text-dark shadow-sidebar flex flex-col justify-between bg-white text-center h-screen fixed top-0 left-0'>
            <div>
                <h1 className='text-3xl font-bold mb-10'>1More Studio</h1>

                <nav className='text-dark'>
                    <ul className='flex flex-col gap-3'>
                        {data.map(item => (
                            <li key={item.id} className='w-full'>
                                <Link
                                    to={item.slug}
                                    className={`py-2 px-4 w-full flex items-center gap-3 block cursor-pointer hover:bg-softYellow hover:text-dark font-semibold hover:rounded-[40px] transition-all duration-300 ${
                                        path === item.slug.toLowerCase()
                                            ? 'bg-softYellow text-dark font-semibold rounded-[40px]'
                                            : ''
                                    }`}
                                >
                                    {/* {item.icon} */}
                                    <item.icon size={20} />
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>

            <div className='flex flex-col gap-3'>
                <div className='flex items-center gap-3'>
                    <RiAdminFill color='#FF4647' size={30} />
                    
                    <div className='flex flex-col items-start'>
                        <p className='text-md font-semibold text-dark'>{userProfile?.name}</p>
                        <p className='text-sm text-light'>Admin</p>
                    </div>
                </div>

                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 text-red rounded-md transition-all duration-300"
                >
                    <FiLogOut color='#FF4647' size={20} />
                    Çıkış Yap
                </button>
            </div>
        </div>
    )
}

export default Sidebar;
