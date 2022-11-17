import React from 'react'
import { NavLink, Outlet } from 'react-router-dom';

export default function TradingHeader() {
  return (
    <>
        <ul className='navbar'>
            <li>
                <NavLink to={"/tradingAccount"}>Accounts</NavLink>
            </li>
            <li>
                <NavLink to={"/tradingAccount/Tradingparameters"}>Trading Parameters</NavLink>
            </li>
            <li>
                <NavLink to={"/tradingAccount/brokerage"}>Brokerage</NavLink>
            </li>
            <li>
                <NavLink to={"/tradingAccount/accessrequesttoken"}>Trading access request token</NavLink>
            </li>
        </ul>
        <Outlet/>
    </>
  )
}
