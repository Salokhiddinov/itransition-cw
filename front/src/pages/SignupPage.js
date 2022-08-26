import { useRef } from "react";
import { Link } from "react-router-dom";
import BaseCard from "../components/UI/BaseCard";
import axios from "../plugins/axios";
let userExists = false;

export default function SignupPage() {
  const inputUsername = useRef();
  const inputPassword = useRef();
  const inputName = useRef();
  const inputLastName = useRef();
  const inputEmail = useRef()

  async function handleSubmit(e) {
    e.preventDefault();

    const enteredEmail = inputEmail.current.value.toLowerCase();
    const enteredUsername = inputUsername.current.value.toLowerCase();
    const enteredPassword = inputPassword.current.value;
    const enteredName = inputName.current.value;
    const enteredLastName = inputLastName.current.value;

    if (enteredUsername.trim().length === 0) {
      alert("Please enter username.");
      return false;
    }
    if (enteredPassword.trim().length === 0 || enteredPassword.length < 4) {
      alert("Password should not be empty or less than 4 characters.");
      return false;
    }
    console.log(enteredUsername, enteredPassword, enteredName, enteredLastName);

    // check if user exists
    const res = await axios.get("user");
    const candidate = res.data.find(
      (name) => name.username === enteredUsername
    );
    console.log(candidate);
    if (candidate) {
      userExists = true;
      alert("User already exists");
        window.location.href("/login")
    }
    const userData = {
      username: enteredUsername,
      name: enteredName,
      lastName: enteredLastName,
      password: enteredPassword,
      email: enteredEmail
    };
    try {
      await axios.post("user/registration", userData);
      alert("User created successfully");
      const loginData = {
        email: enteredEmail,
        password: enteredPassword
      }
      const loginRes = await axios.post("user/login", loginData);
      localStorage.setItem("token", loginRes.data.token);
      localStorage.setItem("currentUser", JSON.stringify(loginRes.data.user));
      window.location.href = "/";
    } catch (err) {
      console.log(err);
      alert("Please check your username and password");
      return false;
    }
  }

  return (
    <BaseCard>
      <form onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <p>
          Already have an account? <Link to="/login">Log In</Link>
        </p>
        <div className="formItem">
          <label htmlFor="name">Name</label>
          <input
            type="test"
            className="form-control"
            placeholder="John"
            ref={inputName}
            required
          />
        </div>
        <div className="formItem">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="test"
            className="form-control"
            placeholder="Jefferson"
            ref={inputLastName}
            required
          />
        </div>
        <div className="formItem">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className="form-control"
            placeholder="@username"
            ref={inputUsername}
            required
          />
        </div>
        <div className="formItem">
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            className="form-control"
            placeholder="your-email@gmail.com"
            ref={inputEmail}
            required
          />
        </div>
        <div className="formItem">
          <label htmlFor="password">Password</label>
          <input
            className="form-control"
            type="password"
            placeholder="password123"
            ref={inputPassword}
            required
          />
        </div>
        <div>
          <button className="btn btn-success">Submit</button>
        </div>
      </form>
      {userExists ? (
        <div>
          <p>User Exists! You will be redirected to login page.</p>
        </div>
      ) : null}
    </BaseCard>
  );
}
