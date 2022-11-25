import React, { useContext } from 'react'
import { NavLink, Outlet } from 'react-router-dom';

export default function DashboardHeader({role}) {

  return (
    <>
        <div>
            {role === "admin" ?
            <ul className='navbar'>
                <li>
                    <NavLink to={"/main/dashboard/tradersdashboard"}>Trader's Dashboard</NavLink>
                </li>
                <li>
                    <NavLink to={"/main/dashboard/CompanyPosition"}>Company:Position</NavLink>
                </li>
                <li>
                    <NavLink to={"/main/dashboard"}>Traders:Position</NavLink>
                </li>
                <li>
                    <NavLink to={"/main/dashboard/CompanyOrders"}>Company:Orders</NavLink>
                </li>
                <li>
                    <NavLink to={"/main/dashboard/TradersOrders"}>Traders:Orders</NavLink>
                </li>
            </ul>
            :
            <ul className='navbar'>
                <li>
                    <NavLink to={"/main/dashboard"}>Traders:Position</NavLink>
                </li>
                <li>
                    <NavLink to={"/main/dashboard/TradersOrders"}>Traders:Orders</NavLink>
                </li>
            </ul> }

            <Outlet/>
        </div>
    </>
  )
}