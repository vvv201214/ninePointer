import Styles from "./Summary.module.css";
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { userContext } from "../../AuthContext";
import { BarChart, Bar, CartesianGrid, XAxis, YAxis} from 'recharts';

export default function Summary() {
    const getDetails = useContext(userContext);
    const [userDetail, setUserDetail] = useState([]);
    const [userTradeDetails, setUserTradeDetails] = useState([]);
    let baseUrl = process.env.NODE_ENV === "production" ? "/" : "http://localhost:5000/"
    let [firstDate, setFirstDate] = useState("");
    const [selectUserState, setSelectUserState] = useState("All User");
    let secondDate = "";
    let userId = (getDetails.userDetails.role === "admin") && getDetails.userDetails.email;

   
    

    

    return (
        // <div>
        //     <div className="main_Container">
        //         <div className="right_side">
        //             <div className="rightside_maindiv">
        //                 <div className={Styles.topbox}>
        //                     <div className={Styles.second_box}>
        //                         <div className={Styles.liveBoxone}>
        //                             <div className={Styles.blinkitlive}>🟢 Company P&L(Live)</div>
        //                             <div className={Styles.divGroupsOne}>
        //                                 <span className={Styles.box1}>
        //                                     <h3 className={Styles.boxliveData} >Gross P&L</h3>
        //                                     <h2 className={Styles.boxliveNumber}>14000</h2>
        //                                 </span>
        //                                 <span className={Styles.box2}>
        //                                     <h3 className={Styles.boxliveData} >Transaction Cost</h3>
        //                                     <h2 className={Styles.boxliveNumber}>2500</h2>
        //                                 </span>
        //                                 <span className={Styles.box3}>
        //                                     <h3 className={Styles.boxliveData} >Net P&L</h3>
        //                                     <h2 className={Styles.boxliveNumber}>9643</h2>
        //                                 </span>
        //                             </div>
        //                             <div className={Styles.divGroupsTwo}>
        //                                 <span className={Styles.box4}>
        //                                     <h3 className={Styles.boxliveData} >Open Lots</h3>
        //                                     <h5 className={Styles.boxliveNumber}>18500CE <span>-2500</span></h5>
        //                                     <h5 className={Styles.boxliveNumber}>18500CE <span>-2500</span></h5>
        //                                 </span>
        //                                 <span className={Styles.box5}>
        //                                     <h3 className={Styles.boxliveData} >LTP</h3>
        //                                     <h5 className={Styles.boxliveNumber}>18500CE <span>-2500</span></h5>
        //                                     <h5 className={Styles.boxliveNumber}>18500CE <span>-2500</span></h5>
        //                                 </span>

        //                                 <span className={Styles.box6}>
        //                                     <h3 className={Styles.boxliveData} ># Of Traders</h3>
        //                                     <table className={Styles.boxlive_table}>
        //                                         <tr className={Styles.boxlive_tr}>
        //                                             <th className={Styles.boxlive_th}>Under Trade </th>
        //                                             <th className={Styles.boxlive_th}>Ideal</th>
        //                                             <th className={Styles.boxlive_th}>Total</th>
        //                                         </tr>
        //                                         <tr>
        //                                             <td className={Styles.boxlive_td}>15</td>
        //                                             <td className={Styles.boxlive_td}>3</td>
        //                                             <td className={Styles.boxlive_td}>18</td>
        //                                         </tr>
        //                                     </table>
        //                                 </span>
        //                             </div>

        //                         </div>
        //                         <div className={Styles.liveBoxone}>
        //                             <div className={Styles.blinkitlive}>🟢 Trader P&L(Live)</div>
        //                             <div className={Styles.divGroupsOne}>
        //                                 <span className={Styles.box1}>
        //                                     <h3 className={Styles.boxliveData} >Gross P&L</h3>
        //                                     <h2 className={Styles.boxliveNumber}>14000</h2>
        //                                 </span>
        //                                 <span className={Styles.box2}>
        //                                     <h3 className={Styles.boxliveData} >Transaction Cost</h3>
        //                                     <h2 className={Styles.boxliveNumber}>2500</h2>
        //                                 </span>
        //                                 <span className={Styles.box3}>
        //                                     <h3 className={Styles.boxliveData} >Net P&L</h3>
        //                                     <h2 className={Styles.boxliveNumber}>9643</h2>
        //                                 </span>
        //                             </div>
        //                             <div className={Styles.divGroupsTwo}>
        //                                 <span className={Styles.box4}>
        //                                     <h3 className={Styles.boxliveData} >Open Lots</h3>
        //                                     <h5 className={Styles.boxliveNumber}>18500CE <span>-2500</span></h5>
        //                                     <h5 className={Styles.boxliveNumber}>18500CE <span>-2500</span></h5>
        //                                 </span>
        //                                 <span className={Styles.box5}>
        //                                     <h3 className={Styles.boxliveData} >LTP</h3>
        //                                     <h5 className={Styles.boxliveNumber}>18500CE <span>-2500</span></h5>
        //                                     <h5 className={Styles.boxliveNumber}>18500CE <span>-2500</span></h5>
        //                                 </span>
        //                                 <span className={Styles.box6}>
        //                                     <h3 className={Styles.boxliveData} ># Of Traders</h3>
        //                                     <table className={Styles.boxlive_table}>
        //                                         <tr className={Styles.boxlive_tr}>
        //                                             <th className={Styles.boxlive_th}>Under Trade</th>
        //                                             <th className={Styles.boxlive_th}>Ideal</th>
        //                                             <th className={Styles.boxlive_th}>Total</th>
        //                                         </tr>
        //                                         <tr>
        //                                             <td className={Styles.boxlive_td}>15</td>
        //                                             <td className={Styles.boxlive_td}>3</td>
        //                                             <td className={Styles.boxlive_td}>18</td>
        //                                         </tr>
        //                                     </table>
        //                                 </span>
        //                             </div>
        //                         </div>
        //                     </div>

        //                     <div className={Styles.second_box}>
        //                         <div className={Styles.mockBoxone}>
        //                             <div className={Styles.blinkitmock}>🔵 Company P&L(Mock)</div>
        //                             <div className={Styles.divGroupsOne}>
        //                                 <span className={`${Styles.box1} ${Styles.mockbox1}`}>
        //                                     <h3 className={Styles.boxliveData} >Gross P&L</h3>
        //                                     <h2 className={Styles.boxliveNumber}>14000</h2>
        //                                 </span>
        //                                 <span className={`${Styles.box2} ${Styles.mockbox1}`}>
        //                                     <h3 className={Styles.boxliveData} >Transaction Cost</h3>
        //                                     <h2 className={Styles.boxliveNumber}>2500</h2>
        //                                 </span>
        //                                 <span className={`${Styles.box3} ${Styles.mockbox1}`}>
        //                                     <h3 className={Styles.boxliveData} >Net P&L</h3>
        //                                     <h2 className={Styles.boxliveNumber}>9643</h2>
        //                                 </span>
        //                             </div>
        //                             <div className={Styles.divGroupsTwo}>
        //                                 <span className={`${Styles.box4} ${Styles.mockbox1}`}>
        //                                     <h3 className={Styles.boxliveData} >Open Lots</h3>
        //                                     <h5 className={Styles.boxliveNumber}>18500CE <span>-2500</span></h5>
        //                                     <h5 className={Styles.boxliveNumber}>18500CE <span>-2500</span></h5>
        //                                 </span>
        //                                 <span className={`${Styles.box5} ${Styles.mockbox1}`}>
        //                                     <h3 className={Styles.boxliveData} >LTP</h3>
        //                                     <h5 className={Styles.boxliveNumber}>18500CE <span>-2500</span></h5>
        //                                     <h5 className={Styles.boxliveNumber}>18500CE <span>-2500</span></h5>
        //                                 </span>
        //                                 <span className={`${Styles.box1} ${Styles.mockbox1}`}>
        //                                     <h3 className={Styles.boxliveData} ># Of Traders</h3>
        //                                     <table className={Styles.boxlive_table}>
        //                                         <tr className={Styles.boxlive_tr}>
        //                                             <th className={Styles.boxlive_th}>Under Trade </th>
        //                                             <th className={Styles.boxlive_th}>Ideal </th>
        //                                             <th className={Styles.boxlive_th}>Total</th>
        //                                         </tr>
        //                                         <tr>
        //                                             <td className={Styles.boxlive_td}>15</td>
        //                                             <td className={Styles.boxlive_td}>3</td>
        //                                             <td className={Styles.boxlive_td}>18</td>
        //                                         </tr>
        //                                     </table>
        //                                 </span>
        //                             </div>
        //                         </div>
        //                         <div className={Styles.mockBoxone}>
        //                             <div className={Styles.blinkitmock}>🔵 Trader P&L(Mock)</div>
        //                             <div className={Styles.divGroupsOne}>
        //                                 <span className={`${Styles.box1} ${Styles.mockbox1}`}>
        //                                     <h3 className={Styles.boxliveData} >Gross P&L</h3>
        //                                     <h2 className={Styles.boxliveNumber}>14000</h2>
        //                                 </span>
        //                                 <span className={`${Styles.box2} ${Styles.mockbox1}`}>
        //                                     <h3 className={Styles.boxliveData} >Transaction Cost</h3>
        //                                     <h2 className={Styles.boxliveNumber}>2500</h2>
        //                                 </span>
        //                                 <span className={`${Styles.box3} ${Styles.mockbox1}`}>
        //                                     <h3 className={Styles.boxliveData} >Net P&L</h3>
        //                                     <h2 className={Styles.boxliveNumber}>9643</h2>
        //                                 </span>
        //                             </div>
        //                             <div className={Styles.divGroupsTwo}>
        //                                 <span className={`${Styles.box4} ${Styles.mockbox1}`}>
        //                                     <h3 className={Styles.boxliveData} >Open Lots</h3>
        //                                     <h5 className={Styles.boxliveNumber}>18500CE <span>-2500</span></h5>
        //                                     <h5 className={Styles.boxliveNumber}>18500CE <span>-2500</span></h5>
        //                                 </span>
        //                                 <span className={`${Styles.box5} ${Styles.mockbox1}`}>
        //                                     <h3 className={Styles.boxliveData} >LTP</h3>
        //                                     <h5 className={Styles.boxliveNumber}>18500CE <span>-2500</span></h5>
        //                                     <h5 className={Styles.boxliveNumber}>18500CE <span>-2500</span></h5>
        //                                 </span>
        //                                 <span className={`${Styles.box6} ${Styles.mockbox1}`}>
        //                                     <h3 className={Styles.boxliveData} ># Of Traders</h3>
        //                                     <table className={Styles.boxlive_table}>
        //                                         <tr className={Styles.boxlive_tr}>
        //                                             <th className={Styles.boxlive_th}>Under Trade </th>
        //                                             <th className={Styles.boxlive_th}>Ideal </th>
        //                                             <th className={Styles.boxlive_th}>Total</th>
        //                                         </tr>
        //                                         <tr>
        //                                             <td className={Styles.boxlive_td}>15</td>
        //                                             <td className={Styles.boxlive_td}>3</td>
        //                                             <td className={Styles.boxlive_td}>18</td>
        //                                         </tr>
        //                                     </table>
        //                                 </span>
        //                             </div>
        //                         </div>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </div>

        <div class="container-fluid py-4">
        <div class="row">
          <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
            <div class="card">
              <div class="card-header p-3 pt-2">
                <div class="icon icon-lg icon-shape bg-gradient-dark shadow-dark text-center border-radius-xl mt-n4 position-absolute">
                  {/* <i class="material-icons opacity-10">weekend</i> */}
                </div>
                <div class="text-end pt-1">
                  <p class="text-sm mb-0 text-capitalize">Net P&L (Today)</p>
                  <h4 class="mb-0">+₹53k</h4>
                </div>
              </div>
              <hr class="dark horizontal my-0"/>
              <div class="card-footer p-3">
                <p class="mb-0"><span class="text-success text-sm font-weight-bolder">+₹53k </span>yesterday </p>
              </div>
            </div>
          </div>
          <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
            <div class="card">
              <div class="card-header p-3 pt-2">
                <div class="icon icon-lg icon-shape bg-gradient-primary shadow-primary text-center border-radius-xl mt-n4 position-absolute">
                  {/* <i class="material-icons opacity-10">person</i> */}
                </div>
                <div class="text-end pt-1">
                  <p class="text-sm mb-0 text-capitalize">Net P&L (This Week)</p>
                  <h4 class="mb-0">+₹103k</h4>
                </div>
              </div>
              <hr class="dark horizontal my-0"/>
              <div class="card-footer p-3">
                <p class="mb-0"><span class="text-success text-sm font-weight-bolder">+₹235k </span>last week</p>
              </div>
            </div>
          </div>
          <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
            <div class="card">
              <div class="card-header p-3 pt-2">
                <div class="icon icon-lg icon-shape bg-gradient-success shadow-success text-center border-radius-xl mt-n4 position-absolute">
                  {/* <i class="material-icons opacity-10">person</i> */}
                </div>
                <div class="text-end pt-1">
                  <p class="text-sm mb-0 text-capitalize">Net P&L (This Month)</p>
                  <h4 class="mb-0">+₹345k</h4>
                </div>
              </div>
              <hr class="dark horizontal my-0"/>
              <div class="card-footer p-3">
                <p class="mb-0"><span class="text-danger text-sm font-weight-bolder">+₹803k</span> last month</p>
              </div>
            </div>
          </div>
          <div class="col-xl-3 col-sm-6">
            <div class="card">
              <div class="card-header p-3 pt-2">
                <div class="icon icon-lg icon-shape bg-gradient-info shadow-info text-center border-radius-xl mt-n4 position-absolute">
                  {/* <i class="material-icons opacity-10">weekend</i> */}
                </div>
                <div class="text-end pt-1">
                  <p class="text-sm mb-0 text-capitalize">Net P&L (This Year)</p>
                  <h4 class="mb-0">+₹345k</h4>
                </div>
              </div>
              <hr class="dark horizontal my-0"/>
              <div class="card-footer p-3">
                <p class="mb-0"><span class="text-success text-sm font-weight-bolder">+₹803k </span>last year</p>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
            <div class="card">
              <div class="card-header p-3 pt-2">
                <div class="icon icon-lg icon-shape bg-gradient-dark shadow-dark text-center border-radius-xl mt-n4 position-absolute">
                  {/* <i class="material-icons opacity-10">weekend</i> */}
                </div>
                <div class="text-end pt-1">
                  <p class="text-sm mb-0 text-capitalize">Profitable Traders (Today)</p>
                  <h4 class="mb-0">10</h4>
                </div>
              </div>
              <hr class="dark horizontal my-0"/>
              <div class="card-footer p-3">
                <p class="mb-0"><span class="text-success text-sm font-weight-bolder">5 </span>yesterday</p>
              </div>
            </div>
          </div>
          <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
            <div class="card">
              <div class="card-header p-3 pt-2">
                <div class="icon icon-lg icon-shape bg-gradient-primary shadow-primary text-center border-radius-xl mt-n4 position-absolute">
                  {/* <i class="material-icons opacity-10">person</i> */}
                </div>
                <div class="text-end pt-1">
                  <p class="text-sm mb-0 text-capitalize">Profitable Traders (This Week)</p>
                  <h4 class="mb-0">10</h4>
                </div>
              </div>
              <hr class="dark horizontal my-0"/>
              <div class="card-footer p-3">
                <p class="mb-0"><span class="text-success text-sm font-weight-bolder">10 </span>last week</p>
              </div>
            </div>
          </div>
          <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
            <div class="card">
              <div class="card-header p-3 pt-2">
                <div class="icon icon-lg icon-shape bg-gradient-success shadow-success text-center border-radius-xl mt-n4 position-absolute">
                  {/* <i class="material-icons opacity-10">person</i> */}
                </div>
                <div class="text-end pt-1">
                  <p class="text-sm mb-0 text-capitalize">Total Traders</p>
                  <h4 class="mb-0">13</h4>
                </div>
              </div>
              <hr class="dark horizontal my-0"/>
              <div class="card-footer p-3">
                <p class="mb-0"><span class="text-danger text-sm font-weight-bolder">-2%</span> than yesterday</p>
              </div>
            </div>
          </div>
          <div class="col-xl-3 col-sm-6">
            <div class="card">
              <div class="card-header p-3 pt-2">
                <div class="icon icon-lg icon-shape bg-gradient-info shadow-info text-center border-radius-xl mt-n4 position-absolute">
                  {/* <i class="material-icons opacity-10">weekend</i> */}
                </div>
                <div class="text-end pt-1">
                  <p class="text-sm mb-0 text-capitalize">Highest P&L</p>
                  <h4 class="mb-0">+₹103,430</h4>
                </div>
              </div>
              <hr class="dark horizontal my-0"/>
              <div class="card-footer p-3">
                <p class="mb-0"><span class="text-success text-sm font-weight-bolder">+5% </span>than yesterday</p>
              </div>
            </div>
          </div>
        </div>
         {/* next divison starts */}
        <div class="row mt-4">
          <div class="col-lg-4 col-md-6 mt-4 mb-4">
            <div class="card z-index-2 ">
              <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2 bg-transparent">
                <div class="bg-gradient-primary shadow-primary border-radius-lg py-3 pe-1">
                  <div class="chart">
                    <canvas id="chart-bars" class="chart-canvas" height="170"></canvas>
                    
                  </div>
                </div>
              </div>
              <div class="card-body">
                <h6 class="mb-0 ">Website Views</h6>
                <p class="text-sm ">Last Campaign Performance</p>
                <hr class="dark horizontal"/>
                <div class="d-flex ">
                  {/* <i class="material-icons text-sm my-auto me-1">schedule</i> */}
                  <p class="mb-0 text-sm"> campaign sent 2 days ago </p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-6 mt-4 mb-4">
            <div class="card z-index-2  ">
              <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2 bg-transparent">
                <div class="bg-gradient-success shadow-success border-radius-lg py-3 pe-1">
                  <div class="chart">
                    <canvas id="chart-line" class="chart-canvas" height="170"></canvas>
                  </div>
                </div>
              </div>
              <div class="card-body">
                <h6 class="mb-0 "> Daily Sales </h6>
                <p class="text-sm "> (<span class="font-weight-bolder">+15%</span>) increase in today sales. </p>
                <hr class="dark horizontal"/>
                <div class="d-flex ">
                  {/* <i class="material-icons text-sm my-auto me-1">schedule</i> */}
                  <p class="mb-0 text-sm"> updated 4 min ago </p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-4 mt-4 mb-3">
            <div class="card z-index-2 ">
              <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2 bg-transparent">
                <div class="bg-gradient-dark shadow-dark border-radius-lg py-3 pe-1">
                  <div class="chart">
                    <canvas id="chart-line-tasks" class="chart-canvas" height="170"></canvas>
                  </div>
                </div>
              </div>
              <div class="card-body">
                <h6 class="mb-0 ">Completed Tasks</h6>
                <p class="text-sm ">Last Campaign Performance</p>
                <hr class="dark horizontal"/>
                <div class="d-flex ">
                  {/* <i class="material-icons text-sm my-auto me-1">schedule</i> */}
                  <p class="mb-0 text-sm">just updated</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>


    )
}

{/* <td className={Styles.topboxlive}>
<table>
<tr>
<td>Gross P&L</td>
<td>+25,000</td>
</tr>
</table>
</td>
<td className={Styles.topboxlive}>Some Text Here</td>
<td className={Styles.topboxlive}>Some Text Here</td>
</tr>

<td className={Styles.topboxlive}>Some Text Here</td>
<td className={Styles.topboxlive}>Some Text Here</td>
<td className={Styles.topboxlive}>Some Text Here</td>
</tr>
</table>
</td> */}
{/* <td>
<table> */}

{/* <tr>
<td className={Styles.topboxlive}>Some Text Here</td>
<td className={Styles.topboxlive}>Some Text Here</td>
<td className={Styles.topboxlive}>Some Text Here</td>
</tr>
<tr>
<td className={Styles.topboxlive}>Some Text Here</td>
<td className={Styles.topboxlive}>Some Text Here</td>
<td className={Styles.topboxlive}>Some Text Here</td>
</tr>
</table>
</td>
</tr>
<tr>
<td>
<table> */}