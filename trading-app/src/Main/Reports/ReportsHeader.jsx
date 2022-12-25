import React, { useContext } from 'react'
import { NavLink, Outlet } from 'react-router-dom';

export default function ReportsHeader({role}) {

  return (
    <>
        <div>
            <ul className='navbar'>
                <li>
                    <NavLink className='headers_li_links' to={"/main/report/"} style={({isActive}) => isActive?{color: "#5479FC"} :{color:'black'} }>Daily P&L Report</NavLink>
                </li>
            </ul>
           
            <Outlet/>
        </div>
    </>
  )
}