import React from 'react'
import { NavLink, Outlet } from 'react-router-dom';

export default function InstrumentHeader() {
  return (
    <>
        <ul className='navbar'>
            <li>
                <NavLink to={"/main/instrument/"} style={({isActive}) => isActive?{backgroundColor: "white", borderRadius: "3px"} :{colbackgroundColor:'black'} }>Instruments</NavLink>
            </li>
        </ul>
        <Outlet/>
    </>
  )
}