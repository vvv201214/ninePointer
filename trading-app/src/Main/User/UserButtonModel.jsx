import React, { useState } from "react";
import "./UserButtonModel.css";

export default function UserButtonModel() {
  const [modal, setModal] = useState(false);
  const [formstate, setformstate] = useState({

    Name: "",
    Designation:"",
    EmailID:"",
    MobileNo:"",
    Degree:"",
    DOB:"",
    Gender:"",
    TradingExp:"",
    Location:"",
    LastOccupation :"",
    DateofJoining : "",
    Role:"",
    Status:""

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
      <button onClick={toggleModal} className="Ac_btn">Create User</button>

      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
          <form className="UserMainFormModel">
            <label className="userModelform" htmlFor="">Name</label>
            <input type="text" className="userModelforminput" onChange={(e) => { { formstate.Name = e.target.value } }}/>
            <label className="userModelform" htmlFor="">Designation</label>
            <input type="text" className="userModelforminput" onChange={(e) => { { formstate.Designation = (e.target.value).toUpperCase() } }}/>
            <label className="userModelform" htmlFor="">EmailID</label>
            <input type="text" className="userModelforminput" onChange={(e) => { { formstate.EmailID = e.target.value.toUpperCase() } }}/>
            <label htmlFor="" className="userModelform">MobileNo</label>
            <input type="text" className="userModelforminput" onChange={(e) => { { formstate.MobileNo = e.target.value } }} />
            <label htmlFor="" className="userModelform">Degree</label>
            <input type="text" className="userModelforminput" onChange={(e) => { { formstate.Degree = e.target.value } }} />
            <label htmlFor="" className="userModelform">DOB</label>
            <input type="text" className="userModelforminput" onChange={(e) => { { formstate.DOB = e.target.value } }} />
            <label htmlFor="" className="userModelform">Gender</label>
            <select name="" id="" className="userModelforminput" onChange={(e) => { { formstate.Gender = e.target.value } }}>
                <option value=""></option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
            </select>
            <label htmlFor="" className="userModelform">Trading Exp.</label>
            <input type="text" className="userModelforminput" onChange={(e) => { { formstate.TradingExp = e.target.value } }} />
            <label htmlFor="" className="userModelform">Location</label>
            <input type="text" className="userModelforminput" onChange={(e) => { { formstate.Location = e.target.value } }} />
            <label htmlFor="" className="userModelform">Last Occupation</label>
            <input type="text" className="userModelforminput" onChange={(e) => { { formstate.LastOccupation = e.target.value } }} />
            <label htmlFor="" className="userModelform">Date of Joining</label>
            <input type="text" className="userModelforminput" onChange={(e) => { { formstate.DateofJoining = e.target.value } }} />
            <label htmlFor="" className="userModelform">Role</label>
            <input type="text" className="userModelforminput" onChange={(e) => { { formstate.Role = e.target.value } }} />
            <label htmlFor="" className="userModelform">Status</label>
            <select name="" id="" className="userModelforminput" onChange={(e) => { { formstate.Status = e.target.value } }}>
                <option value=""></option>
                <option value="Inactive">Inactive</option>
                <option value="Active">Active</option>
            </select> 
        </form>
        <button className="ACform_tbn userCancelbtn" onClick={formbtn}>OK</button> <button className="bsButton1_cancel userCancelbtn" onClick={toggleModal}>CLOSE</button>
           
          </div>
        </div>
      )}
    </>
  );
}