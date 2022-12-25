import React from 'react'
import { NavLink, Outlet } from 'react-router-dom';

export default function UserHeader(){
  return (
    <>
        <ul className='navbar'>
            <li>
                <NavLink className='headers_li_links' to={"/main/user/"} style={({isActive}) => isActive?{color: "#5479FC"} :{color:'black'} }>Users</NavLink>
            </li>
            <li>
                <NavLink className='headers_li_links' to={"/main/user/roles/"} style={({isActive}) => isActive?{color: "#5479FC"} :{color:'black'} }>Roles</NavLink>
            </li>
            {/* <li>
                <NavLink to={"/main/user/UserSelect"}>UserSelect</NavLink>
            </li> */}
        </ul>
        <Outlet/>
    </>
  )
}