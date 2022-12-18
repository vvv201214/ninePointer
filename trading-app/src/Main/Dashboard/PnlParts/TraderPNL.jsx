import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons';


export default function TradersPNL() {
  return (
    <div className="grid_2">
        <table className="grid1_table">
            <tr className="grid2_tr">
                <th className="grid2_th">Trader Name</th>
                <th className="grid2_th">Overall PNL (<FontAwesomeIcon className='fa-xs' icon={faIndianRupeeSign} />)</th>
                <th className="grid2_th">Running PNL (<FontAwesomeIcon className='fa-xs' icon={faIndianRupeeSign} />)</th>
                <th className="grid2_th">Closed PNL(<FontAwesomeIcon className='fa-xs' icon={faIndianRupeeSign} />)</th>
                <th className="grid2_th">Tran. Cost(<FontAwesomeIcon className='fa-xs' icon={faIndianRupeeSign} />)</th>
                <th className="grid2_th"> Net PNL (<FontAwesomeIcon className='fa-xs' icon={faIndianRupeeSign} />)</th>
            </tr>
        </table>
    <button className="DetailsBtn">Details</button>
    </div>
  )
}