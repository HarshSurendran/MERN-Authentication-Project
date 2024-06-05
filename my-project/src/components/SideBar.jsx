import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faUserSecret } from '@fortawesome/free-solid-svg-icons'

const SideBar = () => {
  const [isActive, SetIsActive] = useState("Home");
  const handleActive = (e) => {
    console.log(e.dataset);
    SetIsActive(e.dataset.val);
    console.log(isActive);
  }

  return (
    <div className='h-screen '>
        <div className='h-screen bg-slate-600 text-white w-1/2'>
        <ul >
          <li data-val="Home" onClick={handleActive}  className='flex justify-center border-b-2 cursor-pointer border-white hover:opacity-60'>
            <FontAwesomeIcon icon={faHouse} className={isActive === "Home" ? 'h-7 p-2 my-4 text-black' : 'h-7 p-2 my-4'} />
          </li>
          <li data-val={"User"} onClick={handleActive} className='flex justify-center border-b-2 cursor-pointer border-white hover:opacity-60'>
            <FontAwesomeIcon icon={faUserSecret} className={isActive === "User" ? 'h-7 p-2 my-4 text-black' : 'h-7 p-2 my-4'} />
          </li>
        </ul>  
        </div>
    </div>
  )
}

export default SideBar
