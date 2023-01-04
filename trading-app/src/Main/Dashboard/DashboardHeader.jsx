import React, { useContext } from 'react'
import { NavLink, Outlet } from 'react-router-dom';

export default function DashboardHeader({ role }) {

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
                                <NavLink className='headers_li_links' to={"/main/dashboard/"}  style={({isActive}) => isActive?{color: "#5479FC"} :{color:'black'} }>Positions</NavLink>
                            </li>
                            <li>
                                <NavLink className='headers_li_links' to={"/main/dashboard/TradersOrders"}  style={({isActive}) => isActive?{color: "#5479FC"} :{color:'black'} }>Orders</NavLink>
                            </li>
                            <li>
                                <NavLink className='headers_li_links' to={"/main/dashboard/CompanyPosition/"}  style={({isActive}) => isActive?{color: "#5479FC"} :{color:'black'} }>Position(Company)</NavLink>
                            </li>
                            <li>
                                <NavLink className='headers_li_links' to={"/main/dashboard/TraderPosition/"}  style={({isActive}) => isActive?{color: "#5479FC"} :{color:'black'} }>Position(Traders)</NavLink>
                            </li>
                            <li>
                                <NavLink className='headers_li_links' to={"/main/dashboard/CompanyOrders"} style={({isActive}) => isActive?{color: "#5479FC"} :{color:'black'} }>Company(Orders)</NavLink>
                            </li>
                            <li>
                                <NavLink className='headers_li_links' to={"/main/dashboard/TradersTradeBook"} style={({isActive}) => isActive?{color: "#5479FC"} :{color:'black'} }>Traders(Orders)</NavLink>
                            </li>

                        </ul>
                    </div>
                    :
                    <div className='navbarlinks'>
                        <ul className='navbarUser'>
                            <li>
                                <NavLink className='headers_li_linksUser' to={"/main/dashboard/"}style={({isActive}) => isActive?{color: "#5479FC"} :{color:'black'} }>Positions</NavLink>
                            </li>
                            <li>
                                <NavLink className='headers_li_linksUser' to={"/main/dashboard/TradersOrders"} style={({isActive}) => isActive?{color: "#5479FC"} :{color:'black'} }>TradeBook</NavLink>
                            </li>
                        </ul>
                    </div>}
                <Outlet />
            </div>
        </>
    )
}