import React, { useContext } from 'react'
import { NavLink, Outlet } from 'react-router-dom';

export default function SummaryHeader({role}) {

  return (
    <>
        <div className='navbarlinks'>
            <ul className='navbar'>
                <li>
                    <NavLink className='headers_li_links' style={({isActive}) => isActive?{color: "#5479FC"} :{color:'black'} } to={"/main/admindashboard/summary/"}>Summary</NavLink>
                </li>
                <li>
                    <NavLink className='headers_li_links' style={({isActive}) => isActive?{color: "#5479FC"} :{color:'black'} } to={"/main/admindashboard/summary/pnlreport/"}>Company Daily P&L(Trader-Wise)</NavLink>
                </li>
                <li>
                    <NavLink className='headers_li_links' style={({isActive}) => isActive?{color: "#5479FC"} :{color:'black'} } to={"/main/admindashboard/summary/dailypnlreport/"}>Company Daily P&L</NavLink>
                </li>
            </ul>
           
            <Outlet/>
        </div>
    </>
  )
}