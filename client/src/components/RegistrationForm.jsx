import React, { useState } from "react";
import axios from 'axios';
//TODO: use env
// require('dotenv').config();


// const _fields = {
//     1 : "Full Name",
//     2 : 
// }

export default function Form() {
    const _initFormState = { fullName: '', orgName: '', empIdNumber: '', mobileNumber: '', email: '', idCardImg: null }
    const [employee, setEmployee] = useState(_initFormState)



    const handleInputChange = (e) => {
        const { name, value } = e.target
        // set employee object on input change
        setEmployee({ ...employee, [name]: value })
    }

    const handleImageChange = (e) => setEmployee({ ...employee, idCardImg: e.target.files[0] })


    /*
        const TextField = (props) => {
            console.log(props[0])
            return <div>
                <label>{props[0]}</label>
                <input
                    type="text"
                    name={props[0]}
                    value={employee.fullName}
                    onChange={handleInputChange}
                /></div>
        }
    */
    const onSubmit = (e) => {
        e.preventDefault()
        const data = { fullName: employee.fullName, orgName: employee.orgName, empIdNumber: employee.empIdNumber, mobileNumber: employee.mobileNumber, email: employee.email, idImg: employee.idCardImg }
        //TODO: send data to backend
        console.log(data);
        const HOST_URI = "http://localhost:5002/api"
        const headers = {
            // 'content-type': 'multipart/form-data'
            'content-type': 'application/json'
        }
        axios.post(HOST_URI + '/addEmp', data, { headers: headers }).then(showAlert).catch((err) => console.error(err));
        setEmployee(_initFormState)
    }

    function showAlert(res) {
        console.log(res.data.registrationId);
        alert("Registered Succesfully!!!\nRegistration Id :" + res.data.registrationId);

    }


    return (
        <div >
            <form onSubmit={onSubmit}>

                {/* {Object.entries(initialFormState).map(TextField)}
                 */}

                <label>Full Name</label>
                <input
                    type="text"
                    name="fullName"
                    value={employee.fullName}
                    onChange={handleInputChange}
                />
                <label>Organisation Name</label>
                <input
                    type="text"
                    name="orgName"
                    value={employee.orgName}
                    onChange={handleInputChange}
                />  <label>Employee Id</label>
                <input
                    type="text"
                    name="empIdNumber"
                    value={employee.empIdNumber}
                    onChange={handleInputChange}
                />  <label>Phone Number</label>
                <input
                    type="text"
                    name="mobileNumber"
                    value={employee.mobileNumber}
                    onChange={handleInputChange}
                />  <label>Email</label>
                <input
                    type="text"
                    name="email"
                    value={employee.email}
                    onChange={handleInputChange}
                />


                <input type="file"
                    id="image"
                    accept="image/png, image/jpeg" onChange={handleImageChange} required />

                {/* <Image /> */}
                <br />
                <button type="submit">Submit</button>
            </form>
        </div>
    );




}


