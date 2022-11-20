import React, {useEffect} from 'react'
import MainSideBar from './MainSideBar'
import { userContext } from './AuthContext';
import { useContext } from 'react';
import UserSideBar from './UserSideBar';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';

export default function NewMain() {
    const setDetails = useContext(userContext);
    const [info, setInfo] = useState({});
    let data;
    const dashboardPage = async ()=>{
      try{
          console.log("inside try")
          const res = await fetch("http://localhost:5000/dashboard", {
              method: "GET",
              headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json"
              },
              credentials: "include"
          });
  
          data = await res.json();
          setInfo(data)
          setDetails.setUserDetail(data);
        //   setter(data);
          console.log(data);
  
          if(!res.status === 200){
              throw new Error(res.error);
          }
      } catch(err){
          console.log("Fail to fetch data of user");
          console.log(err);
      }
    }
    useEffect(()=>{
        dashboardPage();
    }, [])
  
  

  return (
    <>
        <div className='main_Container'>

            {info.role === "admin" ?
                 <MainSideBar/>
            :
            
            <div className='left_Side_comp'>
                <UserSideBar/>
            </div>
          
                
            }
            <Outlet/>
            
        </div>
    </>
  )
}
