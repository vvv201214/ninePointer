import React, { useContext } from "react";
import { useEffect } from "react";
import { userContext } from "../AuthContext";
import ReportsHeader from "./ReportsHeader";

function ReportsMain(){
    const getDetails = useContext(userContext);
    useEffect(()=>{
        console.log(getDetails)
    }, [])


    return(
        < >
            <div class="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl">
            <div class="container-fluid py-1 px-3">
                <div>
                <nav aria-label="breadcrumb">
                {/* <ol class="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
                    <li class="breadcrumb-item text-sm"><a class="opacity-5 text-dark" href="javascript:;">🟢</a></li>
                    <li class="breadcrumb-item text-sm text-dark active" aria-current="page"><div className={Styles.blinkitlive}>Live</div></li>
                </ol> */}
                <h6 class="font-weight-bolder mb-0">{`Hi ${getDetails.userDetails.name}! Welcome Back`}</h6>
                </nav>
                </div>
                <div class="mt-sm-0 mt-2 me-md-0 me-sm-4" id="navbar">
          <ul class="navbar-nav  justify-content-evenly">
            <li class="nav-item d-flex align-items-center mx-sm-1">
                <div class="btnnew bg-gradient-info mt-3 w-200"><span>Nifty 50</span><span> : </span><span>&nbsp;NA&nbsp;  </span><span> </span><span> NA </span></div>
            </li>
            <li class="nav-item d-flex align-items-center mx-sm-1">
                <div class="btnnew bg-gradient-info mt-3 w-200"><span>Nifty Bank</span><span> : </span><span>&nbsp; NA &nbsp; </span><span> </span><span> NA </span></div>
            </li>
            <li class="nav-item d-flex align-items-center mx-sm-1">
                <div class="btnnew bg-gradient-primary mt-3 w-100"><span>ninepointer</span></div>
                
            </li>
            </ul>
            </div>
            </div>
            </div>
            <ReportsHeader role = {getDetails.userDetails.role}/>
        </>
    )
}
export default ReportsMain;