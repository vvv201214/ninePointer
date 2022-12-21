import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons';  

function TradersPosition(){
    return(
        <div>
            <div className="main_Container">
                <div className="right_side">
                    <div className="rightside_maindiv">
                        <div className="grid_1">
                            <span className="grid1_span">Instruments Details</span>
                            <table className="grid1_table">
                                <tr className="grid2_tr">
                                    <th className="grid2_th">Trading Date</th>
                                    <th className="grid2_th">Instrument</th>
                                    <th className="grid2_th">LTP (<FontAwesomeIcon className='fa-xs' icon={faIndianRupeeSign} />)</th>
                                    <th className="grid2_th">Change(%)</th>
                                    <th className="grid2_th">Action</th>
                                </tr> 
                            </table>
                        </div>
                        <div className="grid_2">
                            <span className="grid2_span">Overall PNL-Trader</span>
                            <table className="grid1_table">
                                <tr className="grid2_tr">
                                    <th className="grid2_th">Product</th>
                                    <th className="grid2_th">Instrument</th>
                                    <th className="grid2_th">Quantity</th>
                                    <th className="grid2_th">Avg. Price (<FontAwesomeIcon className='fa-xs' icon={faIndianRupeeSign} />)</th>
                                    <th className="grid2_th">LTP (<FontAwesomeIcon className='fa-xs' icon={faIndianRupeeSign} />)</th>
                                    <th className="grid2_th">P&L (<FontAwesomeIcon className='fa-xs' icon={faIndianRupeeSign} />)</th>
                                    <th className="grid2_th">%Change</th>
                                </tr> 
                            </table>
                        </div>
                        <div className="grid_2">
                            <span className="grid2_span">Running PNL-Trader</span>
                            <table className="grid1_table">
                                <tr className="grid2_tr">
                                    <th className="grid2_th">Product</th>
                                    <th className="grid2_th">Instrument</th>
                                    <th className="grid2_th">Quantity</th>
                                    <th className="grid2_th">Average Price (<FontAwesomeIcon className='fa-xs'  icon={faIndianRupeeSign} />)</th>
                                    <th className="grid2_th">LTP (<FontAwesomeIcon className='fa-xs' icon={faIndianRupeeSign} />)</th>
                                    <th className="grid2_th">P&L (<FontAwesomeIcon className='fa-xs' icon={faIndianRupeeSign} />)</th>
                                    <th className="grid2_th">%Change</th>
                                </tr> 
                            </table>
                        </div>
                        <div className="grid_2">
                            <span className="grid2_span">Closed Trades PNL-Trader</span>
                            <table className="grid1_table">
                                <tr className="grid2_tr">
                                    <th className="grid2_th">Product</th>
                                    <th className="grid2_th">Instrument</th>
                                    <th className="grid2_th">Quantity</th>
                                    <th className="grid2_th">Average Price (<FontAwesomeIcon className='fa-xs' icon={faIndianRupeeSign} />)</th>
                                    <th className="grid2_th">LTP (<FontAwesomeIcon className='fa-xs' icon={faIndianRupeeSign} />)</th>
                                    <th className="grid2_th">P&L (<FontAwesomeIcon className='fa-xs' icon={faIndianRupeeSign} />)</th>
                                    <th className="grid2_th">%Change</th>
                                </tr> 
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default TradersPosition;