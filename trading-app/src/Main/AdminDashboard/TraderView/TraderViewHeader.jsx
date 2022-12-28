import React, { useContext } from 'react'
import { NavLink, Outlet } from 'react-router-dom';

export default function TraderViewHeader({role}) {

  return (
    <>
        <div>
            <ul className='navbar'>
                <li>
                    <NavLink className='headers_li_links' style={({isActive}) => isActive?{color: "#5479FC"} :{color:'black'} } to={"/main/admindashboard/traderview"}>Trader View</NavLink>
                </li>
            </ul>
           
            <Outlet/>
        </div>
    </>
  )
}