import React from 'react'
import { NavLink, Outlet } from 'react-router-dom';

export default function InstrumentHeader() {
  return (
    <>
        <ul className='navbar'>
            <li>
                <NavLink className='headers_li_links' to={"/main/instrument/"} style={({isActive}) => isActive?{color: "#5479FC"} :{color:'black'} }>Instruments</NavLink>
            </li>
        </ul>
        <Outlet/>
    </>
  )
}