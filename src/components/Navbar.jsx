import React from 'react'

const Navbar = () => {
  return (
    <div>
      <nav className='flex justify-between bg-slate-400 '>
        <div className="logo">
            <div className="span text-2xl mx-8">AA_Todo</div> 
        </div>
        <ul className="flex gap-8 mx-9">
            <li className='cursor-pointer text-xl hover:font-bold pl-1 transition-all duration-50'>Home</li>
            <li className='cursor-pointer text-xl hover:font-bold pl-1 transition-all duration-50' >Your task</li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar
