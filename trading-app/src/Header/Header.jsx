import React from 'react'
import { NavLink } from 'react-router-dom'
import "./Header.css";

export default function Header() {
  return (
    <>
        <ul className='navbar'>
            <li>
                <NavLink to={"/user"}>User</NavLink>
            </li>
            <li>
                <NavLink to={"/admin"}>Admin</NavLink>
            </li>
            <li>
                <NavLink to={"/login"}>LogIn</NavLink>
            </li>
        </ul>
    </>
  )
}
