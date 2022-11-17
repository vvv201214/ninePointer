import React from 'react'
import { NavLink, Outlet } from 'react-router-dom';

export default function InstrumentHeader() {
  return (
    <>
        <ul className='navbar'>
            <li>
                <NavLink to={"/Instrument"}>Instruments</NavLink>
            </li>
        </ul>
        <Outlet/>
    </>
  )
}