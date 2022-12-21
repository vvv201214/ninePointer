import React, { useContext } from 'react'
import { NavLink, Outlet } from 'react-router-dom';

export default function SummaryHeader({role}) {

  return (
    <>
        <div>
            <ul className='navbar'>
                <li>
                    <NavLink to={"/main/admindashboard/summarydashboard/summary"}>Summary</NavLink>
                    <NavLink to={"/main/admindashboard/summarydashboard/summary"}>Daily P&L</NavLink>
                </li>
            </ul>
           
            <Outlet/>
        </div>
    </>
  )
}