import React from 'react'
import { NavLink, Outlet } from 'react-router-dom';

export default function AlgoHeader() {
  return (
    <>
        <ul className='navbar'>
            <li>
                <NavLink to={"/algobox"}>Trading Algos</NavLink>
            </li>
            <li>
                <NavLink to={"/algobox/InstrumentMapping"}>Instrument Mapping</NavLink>
            </li>
            <li>
                <NavLink to={"/algobox/ExchangeMapping"}>Exchange Mapping</NavLink>
            </li>
            <li>
                <NavLink to={"/algobox/ProductMapping"}>Product Mapping</NavLink>
            </li>
        </ul>
        <Outlet/>
    </>
  )
}