import React,{useState} from 'react'
import Styles from "./DetailsButtonPopup.module.css";

const DetailsButtonPopup = () => {

    const [modal, setModal] = useState(false);
    const toggleModal = () => {
        setModal(!modal);
    };

    if (modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }

  return (
    <div>
        <button onClick={toggleModal}>Details</button>

    {modal && (
        <div className="modal">
            <div onClick={toggleModal} className="overlay"></div>
            <div className={Styles.modalContent}>
                <form className={Styles.main_instrument_form}>
                    {/* <label className={Styles.Ac_form} htmlFor="">Exchange Name (Incoming)</label>
                    <input type="text" value={exNameIncoming} className={Styles.Ac_form} onChange={(e)=>{{setExNameIncoming(e.target.value)}}} />
                    <label htmlFor="" className={Styles.Ac_form}>Incoming Exchange Code</label>
                    <input type="text" value={inExchangeCode} className={Styles.Ac_form} onChange={(e)=>{{setInExchangeCode(e.target.value)}}} />
                    <label htmlFor="" className={Styles.Ac_form}>Exchange Name (Outgoing)</label>
                    <input type="text" value={exNameOutgoing} className={Styles.Ac_form} onChange={(e)=>{{setExNameOutgoing(e.target.value)}}} />
                    <label htmlFor="" className={Styles.Ac_form}>Outgoing Instrument Code</label>
                    <input type="text" value={outInstrumentCode} className={Styles.Ac_form} onChange={(e)=>{{setoutInstrumentCode(e.target.value)}}} />
                    <label htmlFor="" className={Styles.Ac_form}>Status</label>
                    <select name="" id="" value={status} className={Styles.Ac_form} onChange={(e)=>{{setStatus(e.target.value)}}}>
                        <option value=""></option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select> */}
                </form>
                <button className={Styles.ACform_tbn} >OK</button> <button className={Styles.ACform_tbn}>Delete</button>

            </div>
        </div>
    )}
    </div>
  )
}

export default DetailsButtonPopup