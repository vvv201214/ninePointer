import React from 'react'
import { NavLink, Outlet } from 'react-router-dom';

export default function UserHeader(){
  return (
    <>
        <ul className='navbar'>
            <li>
                <NavLink to={"/user"}>Users</NavLink>
            </li>
            <li>
                <NavLink to={"/user/roles"}>Roles</NavLink>
            </li>
        </ul>
        <Outlet/>
    </>
  )
}