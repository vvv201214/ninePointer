import React from 'react'
import { NavLink, Outlet } from 'react-router-dom';

const AdminDashHeader = () => {
  return (
    <>
        <ul className='navbar'>
            <li>
                <NavLink className='headers_li_links' to={"/main/algobox/"} style={({isActive}) => isActive?{color: "#5479FC"} :{color:'black'} }>Trading Algos</NavLink>
            </li>
           
        </ul>
        <Outlet/>
    </>
  )
}

export default AdminDashHeader