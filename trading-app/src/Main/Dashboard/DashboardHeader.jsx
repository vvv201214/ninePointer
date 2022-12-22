import React, { useContext } from 'react'
import { NavLink, Outlet } from 'react-router-dom';

export default function DashboardHeader({role}) {

  return (
    <>
        <div>
            {role === "admin" ?
            
                <div className='navbarlinks'>
                <ul className='navbar'>
                <li>
                    <NavLink to={"/main/dashboard/tradersdashboard"}>Dashboard</NavLink>
                </li>
                <li>
                    <NavLink to={"/main/dashboard"}>Positions</NavLink>
                </li>
                <li>
                    <NavLink to={"/main/dashboard/TradersOrders"}>Orders</NavLink>
                </li>
                <li>
                    <NavLink to={"/main/dashboard/CompanyPosition"}>Position(Company)</NavLink>
                </li>
                <li>
                    <NavLink to={"/main/dashboard/TraderPosition"}>Position(Traders)</NavLink>
                </li>
                <li>
                    <NavLink to={"/main/dashboard/CompanyOrders"}>Orders(Company)</NavLink>
                </li>
                <li>
                    <NavLink to={"/main/dashboard/CompanyOrders"}>Orders(Traders)</NavLink>
                </li>
                </ul>
                </div>
               
            
            :
            <div className='navbarlinks'>
            <ul className='navbar'>
                <li>
                    <NavLink to={"/main/dashboard"}>Positions</NavLink>
                </li>
                <li>
                    <NavLink to={"/main/dashboard/TradersOrders"}>Orders</NavLink>
                </li>
            </ul> 
            </div>}

            <Outlet/>
        </div>
    </>
  )
}