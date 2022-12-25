import React from 'react'
import { NavLink, Outlet } from 'react-router-dom';

export default function TradingHeader() {
  return (
    <>
        <ul className='navbar'>
            <li>
                <NavLink to={"/main/tradingAccount/"} style={({isActive}) => isActive?{backgroundColor: "white", borderRadius: "3px"} :{colbackgroundColor:'black'} }>Accounts</NavLink>
            </li>
            {/* <li>
                <NavLink to={"/main/tradingAccount/Tradingparameters"}>Trading Parameters</NavLink>
            </li> */}
            <li>
                <NavLink to={"/main/tradingAccount/brokerage/"}style={({isActive}) => isActive?{backgroundColor: "white", borderRadius: "3px"} :{colbackgroundColor:'black'} }>Brokerage</NavLink>
            </li>
            <li>
                <NavLink to={"/main/tradingAccount/accessrequesttoken/"}style={({isActive}) => isActive?{backgroundColor: "white", borderRadius: "3px"} :{colbackgroundColor:'black'} }>Trading access request token</NavLink>
            </li>
        </ul>
        <Outlet/>
    </>
  )
}
