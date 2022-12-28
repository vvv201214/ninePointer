import React, { useContext } from 'react'
import { NavLink, Outlet } from 'react-router-dom';

export default function TraderwiseAllPnlHeader({role}) {

  return (
    <>
        <div>
            <ul className='navbar'>
                <li>
                    <NavLink className='headers_li_links' to={"/main/admindashboard/traderpnlreport"}>Trader P&L Report</NavLink>
                </li>
            </ul>
           
            <Outlet/>
        </div>
    </>
  )
}