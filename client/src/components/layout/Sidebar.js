import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { MdSpaceDashboard } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi"; 
import { getAdminProfile, logout } from '../../features/auth/AuthSlice';
import { useDispatch, useSelector } from 'react-redux';
import { IoNotifications } from "react-icons/io5";
import { RiAdminFill } from "react-icons/ri";
import home from "../../assets/svg/home.js";
import members from "../../assets/svg/members.js";
import notifications from "../../assets/svg/notifications.js";

const data = [
    {
        id: 1,
        name: 'Ana Sayfa',
        slug: "/",
        icon: home
    },
    {
        id: 2,
        name: 'Üyeler',
        slug: "/uyeler",
        icon: members
    },
    {
        id: 3,
        name: 'Bildirimler',
        slug: "/bildirimler",
        icon: notifications
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
        <div className='px-5 m-4 py-5 w-[250px] text-dark border border-light flex flex-col justify-between bg-white text-center h-[calc(100vh-32px)] rounded-[20px] fixed top-0 left-0'>
            <div className='w-full'>
                <h1 className='text-3xl font-semibold mb-10 font-marcellus'>1More Studio</h1>

                <nav className='text-dark'>
                    <ul className='flex flex-col gap-3'>
                        {data.map(item => (
                            <li key={item.id} className='w-full'>
                                <Link
                                    to={item.slug}
                                    className={`py-2 px-4 w-full flex items-center gap-3 block cursor-pointer font-semibold rounded-[40px] transition-all duration-300 ${
                                        path === item.slug.toLowerCase()
                                        ? 'text-black'
                                        : 'text-lightText'
                                    }`}
                                >
                                    <item.icon isActive={path === item.slug.toLowerCase()} />
                                    {/* <img src={item.icon} alt={item.name} className='w-5 h-5' /> */}
                                    {item.name}
                                </Link>

                            </li>
                        ))}
                    </ul>
                </nav>
            </div>

            <div className='flex flex-col gap-3'>
                <div className='flex items-center gap-3'>
                    <RiAdminFill color='#000' size={30} />
                    
                    <div className='flex flex-col items-start'>
                        <p className='text-md font-semibold'>{userProfile?.name}</p>
                        <p className='text-xs text-lightText'>Admin</p>
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
