import React, { useContext } from 'react'
import { NavLink, Outlet } from 'react-router-dom';

export default function DashboardHeader({role}) {

  return (
    <>
        <div>
            {role === "admin" ?
            <ul className='navbar'>
                 <li>
                    <NavLink to={"/main/dashboard/"} style={({isActive}) => isActive?{backgroundColor: "white", borderRadius: "3px"} :{colbackgroundColor:'black'} }>Dashboard</NavLink>
                </li>
                <li>
                    <NavLink to={"/main/dashboard/positions/"} style={({isActive}) => isActive?{backgroundColor: "white", borderRadius: "3px"} :{colbackgroundColor:'black'} }>Positions</NavLink>
                </li>
                <li>
                    <NavLink to={"/main/dashboard/TradersOrders"} style={({isActive}) => isActive?{backgroundColor: "white", borderRadius: "3px"} :{colbackgroundColor:'black'} }>TradeBook</NavLink>
                </li>
                 <li>
                    <NavLink to={"/main/dashboard/CompanyPosition/"} style={({isActive}) => isActive?{backgroundColor: "white", borderRadius: "3px"} :{colbackgroundColor:'black'} }>Company Position</NavLink>
                </li>
                <li>
                    <NavLink to={"/main/dashboard/TraderPosition/"} style={({isActive}) => isActive?{backgroundColor: "white", borderRadius: "3px"} :{colbackgroundColor:'black'} }>Traders Position</NavLink>
                </li>
                <li>
                    <NavLink to={"/main/dashboard/CompanyOrders"} style={({isActive}) => isActive?{backgroundColor: "white", borderRadius: "3px"} :{colbackgroundColor:'black'} }>Company TradeBook</NavLink>
                </li>
                <li>
                    <NavLink to={"/main/dashboard/TradersTradeBook"} style={({isActive}) => isActive?{backgroundColor: "white", borderRadius: "3px"} :{colbackgroundColor:'black'} }>Traders TradeBook</NavLink>
                </li>
               
            </ul>
            :
            <ul className='navbar'>
                <li>
                    <NavLink to={"/main/dashboard/"} style={({isActive}) => isActive?{backgroundColor: "white", borderRadius: "3px"} :{colbackgroundColor:'black'} }>Positions</NavLink>
                </li>
                <li>
                    <NavLink to={"/main/dashboard/TradersOrders/"} style={({isActive}) => isActive?{backgroundColor: "white", borderRadius: "3px"} :{colbackgroundColor:'black'} }>TradeBook</NavLink>
                </li>
            </ul> }

            <Outlet/>
        </div>
    </>
  )
}