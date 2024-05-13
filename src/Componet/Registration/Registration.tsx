import { Button } from "@mui/material";
import registrationImage from "../../assets/form_page.png"
import "./registration.css"
import {useEffect, useState } from "react";

export default function Registration() {

    const [formData, setFormData] = useState({
        city: "",
        gender: "",
        name: "",
        age: "",
        breed: "",
        birthdate: "",
        owner: "",
        identification: "",
        username: "",
        password: ""
    });

    useEffect(() => { }, [formData])
    const Insert = () => {
    }

    return (
        <div className="sign-up">
            <div className="out-box">
                <div className="pic">
                    <img src={registrationImage} alt="" />
                </div>
                <div className="in-box">
                    <div className="details"><h1>Yay, we love dogs! and their Owner too please give us your <i>Pups</i> basics</h1></div>
                    <div className="grid">
                        <div className="grid1">
                            <label htmlFor="name">Name</label>
                            <label htmlFor="age">Age</label>
                            <input type="text" name="name" placeholder="Puppy Name" onChange={(event) => { setFormData({ ...formData, name: event.target.value }) }} />
                            <input type="text" name="age" placeholder="Puppy Age" onChange={(event) => { setFormData({ ...formData, age: event.target.value }) }} />
                        </div>
                        <div className="grid1">
                            <label htmlFor="breed">Breed</label>
                            <label htmlFor="birthdate">Birthdate</label>
                            <input type="text" name="breed" placeholder="Breed" onChange={(event) => { setFormData({ ...formData, breed: event.target.value }) }} />
                            <input type="text" name="birthdate" placeholder="dd / mm / yy" onChange={(event) => { setFormData({ ...formData, birthdate: event.target.value }) }} />
                        </div>
                        <div className="grid1">
                            <label htmlFor="Owner">Owner</label>
                            <label htmlFor="identity">Identification</label>
                            <input type="text" name="Owner" placeholder="Owner" onChange={(event) => { setFormData({ ...formData, owner: event.target.value }) }} />
                            <input type="text" name="identity" placeholder="Identification" onChange={(event) => { setFormData({ ...formData, identification: event.target.value }) }} />
                        </div>
                        <div className="grid1">
                            <label htmlFor="username">Username</label>
                            <label htmlFor="password">Password</label>
                            <input type="text" name="username" placeholder="Username" onChange={(event) => { setFormData({ ...formData, username: event.target.value }) }} />
                            <input type="text" name="password" placeholder="Password" onChange={(event) => { setFormData({ ...formData, password: event.target.value }) }} />
                        </div>
                        <div className="grid3">
                            <div>
                                <label htmlFor="Gender"> Gender :  </label>
                                <input type="radio" name="Gender" id="male" value="male" onClick={(event) => { setFormData({ ...formData, gender: (event.target as HTMLInputElement).value }) }} /> <label htmlFor="Gender"> Male </label>
                                <input type="radio" name="Gender" id="female" value="female" onClick={(event) => { setFormData({ ...formData, gender: (event.target as HTMLInputElement).value }) }} /> <label htmlFor="Gender"> Female </label>
                            </div>
                            <div className="grid-3">
                                <label htmlFor="Gender"> City : </label>
                                <select name="city" id="city" onClick={(event) => { setFormData({ ...formData, city: (event.target as HTMLSelectElement).value }) }}>
                                    <option value="">Select</option>
                                    <option value="Pune">Pune</option>
                                    <option value="Nashik">Nashik</option>
                                    <option value="Nagpur">Nagpur</option>
                                    <option value="Mumbai">Mumbai</option>
                                    <option value="Banglore">Banglore</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <Button variant="contained" style={{ position: 'absolute', bottom: "2%", left: '40%', backgroundColor: "#00111c" }} onClick={Insert}>Submit</Button>
                </div>
            </div>
        </div>
    );
}