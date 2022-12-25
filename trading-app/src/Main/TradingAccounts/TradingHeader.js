import React from 'react'
import { NavLink, Outlet } from 'react-router-dom';

export default function TradingHeader() {
  return (
    <>
        <ul className='navbar'>
            <li >
                <NavLink className='headers_li_links' to={"/main/tradingAccount/"} style={({isActive}) => isActive?{color: "#5479FC"} :{color:'black'} }>Accounts</NavLink>
            </li>
            {/* <li>
                <NavLink to={"/main/tradingAccount/Tradingparameters"}>Trading Parameters</NavLink>
            </li> */}
            <li >
                <NavLink className='headers_li_links' to={"/main/tradingAccount/brokerage/"}style={({isActive}) => isActive?{color: "#5479FC"} :{color:'black'} }>Brokerage</NavLink>
            </li>
            <li >
                <NavLink className='headers_li_links' to={"/main/tradingAccount/accessrequesttoken/"}style={({isActive}) => isActive?{color: "#5479FC"} :{color:'black'} }>Trading access request token</NavLink>
            </li>
        </ul>
        <Outlet/>
    </>
  )
}
