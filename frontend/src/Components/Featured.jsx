import React from 'react'
import { FaSearch } from "react-icons/fa";

const Featured = () => {
  return (
    <div className=''>

    <div className='md:bg-transparent relative bottom-[5rem] md:bottom-[0rem] bg-[#1A1B1D] text-white py-[20vw] px-[10vw] md:py-[8vw] md:px-[8vw] mx-auto'>
      <div className='relative items-center space-y-10'>
        <h1 className='text-[5vw] md:text-[3.7vw] text-center md:text-left font-medium'>Find the right <i className='font-notoSerif font-semibold'>freelance</i><br /> service, right away</h1>
        <div className='flex mx-auto md:mx-0 max-w-[50vw]'>
            <input type="text" placeholder="Search for services..." className='border-2 p-3 text-sm rounded-l-md w-[33rem]' />
            <button className='bg- bg-blue-900 px-6 rounded-r-md'><FaSearch /></button>
        </div>
        <div className='flex flex-wrap gap-2 text-sm'>

        <span>Popular :</span>
        <span className='border-2 border-gray-400 rounded-xl px-2 cursor-pointer hover:bg-white hover:text-black'>AI</span>
        <span className='border-2 border-gray-400 rounded-xl px-2 cursor-pointer hover:bg-white hover:text-black'>Wordpress</span>
        <span className='border-2 border-gray-400 rounded-xl px-2 cursor-pointer hover:bg-white hover:text-black'>Logo Design</span>
        <span className='border-2 border-gray-400 rounded-xl px-2 cursor-pointer hover:bg-white hover:text-black'>content Writing</span>
        </div>

      </div>
    </div>
      <img className='absolute w-full right-0 top-16 -z-[1] hidden  md:block' src="/images/hero.png" alt="" />
    </div>

  )
}

export default Featured
