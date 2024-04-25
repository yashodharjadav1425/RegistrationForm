import React, { useState } from "react";
import "./register.css"
import axios from "axios";


export const Register = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [date, setDate] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    if (password.length < 8) {
      return "Password must be at least 8 characters long";
    }

  
    const complexityRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,}$/;
    if (!complexityRegex.test(password)) {
      return "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character";
    }

    return null; 
  };
  const validateAge = (birthdate, minAge) => {
    const birthDateObj = new Date(birthdate);
    const today = new Date();
    var age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = today.getMonth() - birthDateObj.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
      age = age - 1;
    }

    return age >= minAge;
  };

  const validateMobileNumber = (mobile) => {
    const regex = /^\+\d{1,3}\d{10}$/;
    return regex.test(mobile);
  };
  
  const validateName = (name) => {
    const regex = /^[A-Za-z]+$/;
    return regex.test(name);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    
    
    if (!fname.trim() || !lname.trim() || !mobile.trim() || !email.trim() || !date.trim() || !password.trim() || !address.trim()) {
      setError("All fields are required");
      return;
    }

    if (!validateName(fname)) {
      setError("First name must contain only letters");
      return;
    }

    if (!validateName(lname)) {
      setError("Last name must contain only letters");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!validateMobileNumber(mobile)) {
      setError("Please enter a valid mobile number (e.g., +911234567890)");
      return;
    }

    const minAge = 18; 
    if (!validateAge(date, minAge)) {
      setError(`You must be at least ${minAge} years old to register`);
      return;
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    axios.post("http://localhost:3001/register", { fname,
    lname, email, mobile, date, password, address })
      .then(result => {
        console.log(result);
        setSuccessMessage("Registration successful!");
        setError(""); 
      })
      .catch(err => {
        console.log(err);
        setError("Registration failed. Please try again.");
        setSuccessMessage(""); 
      });
  }

  return (
    <>
    <div className="main">
      <div>
        <h1>Sign up</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-block">
            <label htmlFor="fname">
              <strong>First name:</strong>
            </label>
            <input 
              type="text"
              placeholder="Enter first name"
              autoComplete="off"  
              name="fname"
              className="input"
              value={fname}
              onChange={(e) => setFname(e.target.value)}
            />
          </div>

          <div className="input-block">
            <label htmlFor="lname">
              <strong>Last name:</strong>
            </label>
            <input 
              type="text"
              placeholder="Enter last name"
              autoComplete="off"  
              name="lname"
              className="input"
              value={lname}
              onChange={(e) => setLname(e.target.value)}
            />
          </div>

          <div className="input-block">
            <label htmlFor="email">
              <strong>Email:</strong>
            </label>
            <input 
              type="email"
              placeholder="Enter email"
              autoComplete="off"
              name="email"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-block">
            <label htmlFor="mobile">
              <strong>Mobile No.:</strong>
            </label>
            <input 
              type="text"
              placeholder="Enter mobile no."
              autoComplete="off"
              name="mobile"
              className="input"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
          </div>

          <div className="input-block">
            <label htmlFor="date">
              <strong>Date of birth:</strong>
            </label>
            <input 
              type="date"
              placeholder="Enter birth date"
              autoComplete="off"
              name="date"
              className="input"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="input-block">
            <label htmlFor="password">
              <strong>Password:</strong>
            </label>
            <input 
              type="password"
              placeholder="Enter password"
              autoComplete="off"
              name="password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="input-block">
            <label htmlFor="address">
              <strong>Address:</strong>
            </label>
            <textarea 
              type="text"
              placeholder="Enter address"
              autoComplete="off"
              name="address"
              className="input"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          {error && <p className="error">{error}</p>}
          {successMessage && <p className="success">{successMessage}</p>}

          <button type="submit" className="btn">
            Sign up
          </button>
          <p>
          Already have an account?
          <a href="/Login">
            Sign in
          </a>
          </p>
        </form>
        <p>
          
        </p>
      </div>
    </div>
    </>
    
    
  )
}

export default Register;
