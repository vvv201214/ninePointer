import React from "react";


function TradersDashboard(){
    return(
        <div>
            <div className="main_Container">
                <div className="right_side">
                    <div className="rightside_maindiv">
                        <div className="grid_1">
                            <span className="grid1_span">Overall PNL- Company</span>
                            <table className="grid1_table">
                                <tr className="grid2_tr">
                                    <th className="grid2_th">Product</th>
                                    <th className="grid2_th">Instruments</th>
                                    <th className="grid2_th">Quantity</th>
                                    <th className="grid2_th">Average Price</th>
                                    <th className="grid2_th">LTP</th>
                                    <th className="grid2_th">P&L</th>
                                    <th className="grid2_th">%Change</th>
                                </tr>
                            </table>
                        </div>

                        <div className="grid_2">
                            <span className="grid2_span">Inactive Instruments</span>
                            <table className="grid1_table">
                            <tr className="grid2_tr">
                                <th className="grid2_th">Product</th>
                                <th className="grid2_th">Instruments</th>
                                <th className="grid2_th">Quantity</th>
                                <th className="grid2_th">Average Price</th>
                                <th className="grid2_th">LTP</th>
                                <th className="grid2_th">P&L</th>
                                <th className="grid2_th">%Change</th>
                            </tr>
                            </table>
                        </div>
                        <div className="grid_2">
                            <span className="grid2_span">Overall PNL-Traders-Company Side</span>
                            <table className="grid1_table">
                            <tr className="grid2_tr">
                                <th className="grid2_th">Trader Name</th>
                                <th className="grid2_th">Overall PNL</th>
                                <th className="grid2_th">Running PNL</th>
                                <th className="grid2_th">Closed PNL</th>
                                <th className="grid2_th">Open Lots</th>
                                <th className="grid2_th"># of Trades</th>
                                <th className="grid2_th">Trade Status</th>
                                <th className="grid2_th">Tran. Cost</th>
                                <th className="grid2_th">Net PNL</th>
                            </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default TradersDashboard;
