import React from "react";


function TradersDashboard(){
    return(
        <div>
            <div className="main_Container">
                <div className="right_side">
                    <div className="rightside_maindiv">
                        <div className="grid_1">
                            <span className="grid1_span">Overall PNL- Company</span>
                            <ul className="grid1_ul grid2_ul">
                                <li className="grid1_li">Product</li>
                                <li className="grid1_li">Instruments</li>
                                <li className="grid1_li">Quantity</li>
                                <li className="grid1_li">Average Price</li>
                                <li className="grid1_li">LTP</li>
                                <li className="grid1_li">P&L</li>
                                <li className="grid1_li">%Change</li>
                            </ul>
                        </div>

                        <div className="grid_2">
                            <span className="grid2_span">Inactive Instruments</span>
                            <ul className="grid2_ul">
                                <li className="grid2_li">Product</li>
                                <li className="grid2_li">Instruments</li>
                                <li className="grid2_li">Quantity</li>
                                <li className="grid2_li">Average Price</li>
                                <li className="grid2_li">LTP</li>
                                <li className="grid2_li">P&L</li>
                                <li className="grid2_li">%Change</li>
                            </ul>
                        </div>
                        <div className="grid_2">
                            <span className="grid2_span">Overall PNL-Traders-Company Side</span>
                            <ul className="grid2_ul">
                                <li className="grid2_li">Trader Name</li>
                                <li className="grid2_li">Overall PNL</li>
                                <li className="grid2_li">Running PNL</li>
                                <li className="grid2_li">Closed PNL</li>
                                <li className="grid2_li">Open Lots</li>
                                <li className="grid2_li"># of Trades</li>
                                <li className="grid2_li">Trade Status</li>
                                <li className="grid2_li">Tran. Cost</li>
                                <li className="grid2_li">Net PNL</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default TradersDashboard;
