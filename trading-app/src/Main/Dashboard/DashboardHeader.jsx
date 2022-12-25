import React, { useContext } from 'react'
import { NavLink, Outlet } from 'react-router-dom';

export default function DashboardHeader({role}) {

  return (
    <>
        <div>
            
            {role === "admin" ?
            
                <div className='navbarlinks'>
                <ul className='navbar'>
                {/* <li>
                    <NavLink to={"/main/dashboard/"} style={({isActive}) => isActive?{backgroundColor: "white", borderRadius: "3px"} :{colbackgroundColor:'black'} }>Dashboard</NavLink>
                </li> */}
                <li>
                    <NavLink to={"/main/dashboard/positions/"} style={({isActive}) => isActive?{backgroundColor: "white", borderRadius: "3px"} :{colbackgroundColor:'black'} }>Positions</NavLink>
                </li>
                <li>
                    <NavLink to={"/main/dashboard/TradersOrders"} style={({isActive}) => isActive?{backgroundColor: "white", borderRadius: "3px"} :{colbackgroundColor:'black'} }>Orders</NavLink>
                </li>
                 <li>
                    <NavLink to={"/main/dashboard/CompanyPosition/"} style={({isActive}) => isActive?{backgroundColor: "white", borderRadius: "3px"} :{colbackgroundColor:'black'} }>Position(Company)</NavLink>
                </li>
                <li>
                    <NavLink to={"/main/dashboard/TraderPosition/"} style={({isActive}) => isActive?{backgroundColor: "white", borderRadius: "3px"} :{colbackgroundColor:'black'} }>Position(Traders)</NavLink>
                </li>
                <li>
                    <NavLink to={"/main/dashboard/CompanyOrders"}>Company(Orders)</NavLink>
                </li>
                <li>
                    <NavLink to={"/main/dashboard/TradersTradeBook"}>Traders(Orders)</NavLink>
                </li>
               
            </ul>
            </div>
            :
            <div className='navbarlinks'>
            <ul className='navbar'>
                <li>
                    <NavLink to={"/main/dashboard/"} style={({isActive}) => isActive?{backgroundColor: "white", borderRadius: "3px"} :{colbackgroundColor:'black'} }>Positions</NavLink>
                </li>
                <li>
                    <NavLink to={"/main/dashboard/TradersOrders"}>TradeBook</NavLink>
                </li>
            </ul> 
            </div>}

            <Outlet/>
        </div>
    </>
  )
}