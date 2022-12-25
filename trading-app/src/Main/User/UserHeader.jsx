import React from 'react'
import { NavLink, Outlet } from 'react-router-dom';

export default function UserHeader(){
  return (
    <>
        <ul className='navbar'>
            <li>
                <NavLink to={"/main/user/"} style={({isActive}) => isActive?{backgroundColor: "white", borderRadius: "3px"} :{colbackgroundColor:'black'} }>Users</NavLink>
            </li>
            <li>
                <NavLink to={"/main/user/roles/"} style={({isActive}) => isActive?{backgroundColor: "white", borderRadius: "3px"} :{colbackgroundColor:'black'} }>Roles</NavLink>
            </li>
            {/* <li>
                <NavLink to={"/main/user/UserSelect"}>UserSelect</NavLink>
            </li> */}
        </ul>
        <Outlet/>
    </>
  )
}