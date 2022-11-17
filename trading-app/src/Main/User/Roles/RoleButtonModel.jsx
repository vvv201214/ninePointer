import React, { useState } from "react";
import "./RoleButtonModel.css";

export default function RoleButtonModel() {
  const [modal, setModal] = useState(false);
  const [formstate, setformstate] = useState({

    createdOn: "",
    roleName:"",
    instruments:"",
    tradingAccount:"",
    APIParameters:"",
    users:"",
    algoBox:"",
    reports:"",
});

function formbtn(e) {
    e.preventDefault();
    setformstate(formstate);
    console.log(formstate)
    setModal(!modal);

}
  const toggleModal = () => {
    setModal(!modal);
  };

  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  return (
    <>
      <button onClick={toggleModal} className="Ac_btn">Create Role</button>

      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
          <form className="UserMainFormModel">
            <label className="userModelform" htmlFor="">Created On</label>
            <input type="text" className="userModelforminput" onChange={(e) => { { formstate.createdOn = e.target.value } }}/>
            <label className="userModelform" htmlFor="">Role Name</label>
            <input type="text" className="userModelforminput" onChange={(e) => { { formstate.roleName = (e.target.value).toUpperCase() } }}/>
            <label className="userModelform" htmlFor="">Instruments</label>
            <input type="text" className="userModelforminput" onChange={(e) => { { formstate.instruments = e.target.value.toUpperCase() } }}/>
            <label htmlFor="" className="userModelform">Trading Account</label>
            <input type="text" className="userModelforminput" onChange={(e) => { { formstate.tradingAccount = e.target.value } }} />
            <label htmlFor="" className="userModelform">API Parameters</label>
            <input type="text" className="userModelforminput" onChange={(e) => { { formstate.APIParameters = e.target.value } }} />
            <label htmlFor="" className="userModelform">Users</label>
            <input type="text" className="userModelforminput" onChange={(e) => { { formstate.users = e.target.value } }} />
            <label htmlFor="" className="userModelform">AlgoBox</label>
            <input type="text" className="userModelforminput" onChange={(e) => { { formstate.algoBox = e.target.value } }} />
            <label htmlFor="" className="userModelform">Reports</label>
            <input type="text" className="userModelforminput" onChange={(e) => { { formstate.reports = e.target.value } }} />
        </form>
        <button className="ACform_tbn" onClick={formbtn}>OK</button> <button className="bsButton1_cancel" onClick={toggleModal}>CLOSE</button>
           
          </div>
        </div>
      )}
    </>
  );
}