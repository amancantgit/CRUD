import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const Home = () => {
  let styles = 'mx-4 px-5 py-0.5 text-white rounded-lg  bg-[#380308] hover:bg-white hover:text-[#6f0000] transition duration-500 ease-in-out'

  return (
    <>
  <div className='bg-gradient-to-r from-[#273a4e] to-[#bdc3c7] h-[100vh] text-white'>
      <div className=' pt-5 pb-1 flex justify-center items-center'>

      <Link to='/read' className={styles}>Read</Link>
      <Link to='/create' className={styles}>Create</Link>
      <Link to='/update' className={styles}>Update</Link>
      <Link to='/delete' className={styles}>Delete</Link>
      </div>
      
      <div className='flex flex-col items-center mt-5'>
        <Outlet/>
      </div>
  </div>
    </>
  )
}

export default Home
