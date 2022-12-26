import React from 'react'
import { NavLink, Outlet } from 'react-router-dom';

export default function AlgoHeader() {
  return (
    <>
        <ul className='navbar'>
            <li>
                <NavLink className='headers_li_links' to={"/main/algobox/"} style={({isActive}) => isActive?{color: "#5479FC"} :{color:'black'} }>Trading Algos</NavLink>
            </li>
            <li>
                <NavLink className='headers_li_links' to={"/main/algobox/InstrumentMapping/"} style={({isActive}) => isActive?{color: "#5479FC"} :{color:'black'} }>Instrument Mapping</NavLink>
            </li>
            <li>
                <NavLink className='headers_li_links' to={"/main/algobox/ExchangeMapping/"} style={({isActive}) => isActive?{color: "#5479FC"} :{color:'black'} }>Exchange Mapping</NavLink>
            </li>
            <li>
                <NavLink className='headers_li_links' to={"/main/algobox/ProductMapping/"} style={({isActive}) => isActive?{color: "#5479FC"} :{color:'black'} }>Product Mapping</NavLink>
            </li>
        </ul>
        <Outlet/>
    </>
  )
}