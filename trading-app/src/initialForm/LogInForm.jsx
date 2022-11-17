import React from 'react'
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import "./LoginStyle.css";

export default function LogInForm() {
    const [userInfo, setUserInfo] = useState({
        userId : "",
        pass : ""
    });

    function logInButton(e){
        e.preventDefault();
        setUserInfo(userInfo);
        console.log("form submitted", userInfo);
    }
  return (
    <>
        <div className="login_form">
            <h4>Log in to your Account</h4>
            <form className='sub_login_form' onSubmit={logInButton}>
                <input className='user_id' id='userID' placeholder='Enter ID' onChange={(e)=>{{userInfo.userId=e.target.value}}} type={"text"}/>
                <br/><br/>
                <input className='password' id='password' placeholder='Enter Password' onChange={(e)=>{{userInfo.pass = e.target.value}}} type={"password"}/> 
                <br/><br/>
                <div className='btn_forget'>
                    <button className='login_btn'>LogIn</button>
                    <NavLink to={"/forgetPassOrUserid"} >forget userId or password?</NavLink>
                </div>
                <div className='bottom_font'>
                    <NavLink to={"/signup"}>don't have any account?</NavLink>
                </div>
            </form>   
        </div> 
    </>
  )
}
