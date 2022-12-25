import React from 'react'
import { NavLink, Outlet } from 'react-router-dom';

export default function AlgoHeader() {
  return (
    <>
        <ul className='navbar'>
            <li>
                <NavLink to={"/main/algobox/"} style={({isActive}) => isActive?{backgroundColor: "white", borderRadius: "3px"} :{colbackgroundColor:'black'} }>Trading Algos</NavLink>
            </li>
            <li>
                <NavLink to={"/main/algobox/InstrumentMapping/"} style={({isActive}) => isActive?{backgroundColor: "white", borderRadius: "3px"} :{colbackgroundColor:'black'} }>Instrument Mapping</NavLink>
            </li>
            <li>
                <NavLink to={"/main/algobox/ExchangeMapping/"} style={({isActive}) => isActive?{backgroundColor: "white", borderRadius: "3px"} :{colbackgroundColor:'black'} }>Exchange Mapping</NavLink>
            </li>
            <li>
                <NavLink to={"/main/algobox/ProductMapping/"} style={({isActive}) => isActive?{backgroundColor: "white", borderRadius: "3px"} :{colbackgroundColor:'black'} }>Product Mapping</NavLink>
            </li>
        </ul>
        <Outlet/>
    </>
  )
}