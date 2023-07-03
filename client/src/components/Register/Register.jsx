import React, { useState } from "react";
import axios from "axios";
import { useUser } from "../UserProvider";
import "./Register.css";

function Register({ handleModeChange }) {
  const { setUser } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState(""); // Add a new state variable called "firstName"
  const [lastName, setLastName] = useState(""); // Add a new state variable called "lastName"
  const [error, setError] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const register = async (e) => {
    e.preventDefault();

    if (!email.endsWith("@galvanize.com")) {
      setErrorMsg("Email must end with @galvanize.com");
      return;
    }

    try {
      const res = await axios.post("/api/register", { email, password, firstName, lastName });
      const user = await axios.post("api/login", { email, password });
      // Insert JWT (res.data.token)
      localStorage.setItem("token", user.data.token);
      setUser(user.data.user);
      //console.log(res.data.token);
    } catch (err) {
      console.error(err);
      if (err.response && err.response.status === 409) {
        setError("User is already registered, please log in");
      } else {
        setError("Registration failed. Please try again.");
      }
    }
  };

  return (
    <div>
      <h2 className="form-title">First time users register here:</h2>
      <form className="register-form" onSubmit={register}>
      {errorMsg && <p style={{ textAlign: "center" , color: 'red'}} className="error text-center">{errorMsg}</p>}
      <input type="text" placeholder="First Name" onChange={(e) => setFirstName(e.target.value)} required/>
        <input type="text" placeholder="Last Name" onChange={(e) => setLastName(e.target.value)} required/>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Password"
        />
        
        <button type="submit">Register</button>
        
        <p style={{ textAlign: "center" }}>
        Existing user 
         click {" "}
        <a href="#" onClick={() => handleModeChange("login")}>
          here
        </a>
        {''} to login.
      </p>
      </form>
      {/* {error && <p>{error}</p>} */}
      {error && <p className="error text-center">{error}</p>}
      
    </div>
  );
}

export default Register;
