import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Validate } from "../../utils/Validate";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const initialValues = { email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(Validate(formValues));
    setIsSubmit(true);

    const loggedUser = JSON.parse(localStorage.getItem("registeredUserList"));
    const found = loggedUser.find(
      (user) =>
        user.email === formValues.email && user.password === formValues.password
    );
    if (found) {
      alert(`Welcome ${found.email}`);
      navigate("../homepage/Homepage");
    } else {
      alert("wrong Credentials");
    }
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
    }
  }, [formErrors, isSubmit]);

  return (
    <div className="login">
      {Object.keys(formErrors).length === 0 && isSubmit ? (
        <div style={{ color: "green" }}>Signed in successfully</div>
      ) : null}
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          className="loginInput"
          type="text"
          name="email"
          placeholder="Enter your email..."
          value={formValues.email}
          onChange={handleChange}
        />
        <p style={{ color: "red" }}>{formErrors.email}</p>
        <label>Password</label>
        <input
          className="loginInput"
          type="password"
          name="password"
          placeholder="Enter your password..."
          value={formValues.password}
          onChange={handleChange}
        />
        <p style={{ color: "red" }}>{formErrors.password}</p>
        <button className="loginButton">Login</button>
      </form>
      <Link className="link" to="/Register">
        <button className="loginRegisterButton">Register</button>
      </Link>
    </div>
  );
}

export default Login;
