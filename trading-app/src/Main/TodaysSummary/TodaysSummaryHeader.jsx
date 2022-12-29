import React, { useContext } from 'react'
import { NavLink, Outlet } from 'react-router-dom';

export default function TodaysSummaryHeader({role}) {

  return (
    <>
        <div>
            {/* <ul className='navbar'>
                <li>
                    <NavLink to={"/main/todayssummary/"}>Today's Summary</NavLink>
                </li>
            </ul> */}
           
            <Outlet/>
        </div>
    </>
  )
}