import React from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'

const Home = () => {
  const location = useLocation();
  let styles = 'mx-4 px-5 py-0.5 text-white rounded-lg  bg-[#380308] hover:bg-white hover:text-[#6f0000] transition duration-500 ease-in-out'
  const activeStyles = 'bg-white text-red-900';

  const getLinkStyle = (path) => {
    return location.pathname === path ? `${styles} ${activeStyles}` : styles;
  };

  return (
    <>
  <div className='bg-gradient-to-r from-[#273a4e] to-[#bdc3c7] min-h-[100vh] max-h-full text-white'>
      <div className=' pt-5 pb-1 flex justify-center items-center'>
        <Link to='/read' className={getLinkStyle('/read')}>Read</Link>
        <Link to='/create' className={getLinkStyle('/create')}>Create</Link>
        <Link to='/update' className={getLinkStyle('/update')}>Update</Link>
        <Link to='/delete' className={getLinkStyle('/delete')}>Delete</Link>
      </div>
      
      <div className='flex flex-col items-center mt-5'>
        <Outlet/>
      </div>
  </div>
    </>
  )
}

export default Home
