import React, { useContext } from 'react'
import { NavLink, Outlet } from 'react-router-dom';

export default function DashboardHeader({role}) {

  return (
    <>
    <div>  
        <div>
            {role === "admin" ?
            <ul className='navbar'>
                <li>
                    <NavLink to={"/main/dashboard"}>Trader's Dashboard</NavLink>
                </li>
                <li>
                    <NavLink to={"/main/dashboard/CompanyPosition"}>Company:Position</NavLink>
                </li>
                <li>
                    <NavLink to={"/main/dashboard/TradersPosition"}>Traders:Position</NavLink>
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
                {/* <li>
                    <NavLink to={"/dashboard"}>Trader's Dashboard</NavLink>
                </li>
                <li>
                    <NavLink to={"/dashboard/CompanyPosition"}>Company:Position</NavLink>
                </li> */}
                <li>
                    <NavLink to={"/main/dashboard/TradersPosition"}>Traders:Position</NavLink>
                </li>
                {/* <li>
                    <NavLink to={"/dashboard/CompanyOrders"}>Company:Orders</NavLink>
                </li> */}
                <li>
                    <NavLink to={"/main/dashboard/TradersOrders"}>Traders:Orders</NavLink>
                </li>
            </ul> }

            <Outlet/>
        </div>
        </div>
    </>
  )
}