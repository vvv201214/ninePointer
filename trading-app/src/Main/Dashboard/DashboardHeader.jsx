import React from 'react'
import { NavLink, Outlet } from 'react-router-dom';

export default function DashboardHeader() {
  return (
    <>
        <div className='all_headers'>
        <ul className='navbar'>
            <li>
                <NavLink to={"/"}>Trader's Dashboard</NavLink>
            </li>
            <li>
                <NavLink to={"/CompanyPosition"}>Company:Position</NavLink>
            </li>
            <li>
                <NavLink to={"/TradersPosition"}>Traders:Position</NavLink>
            </li>
            <li>
                <NavLink to={"/CompanyOrders"}>Company:Orders</NavLink>
            </li>
            <li>
                <NavLink to={"/TradersOrders"}>Traders:Orders</NavLink>
            </li>
        </ul>
        <Outlet/>
    </div>
    </>
  )
}