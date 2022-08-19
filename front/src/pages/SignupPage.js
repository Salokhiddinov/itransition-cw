import { useRef } from "react";
import { Link } from "react-router-dom";
import Card from "../components/UI/BaseCard";
import axios from "../plugins/axios";
let userExists = false;

export default function SignupPage() {
  const inputUsername = useRef();
  const inputPassword = useRef();

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("press submit");

    const enteredUsername = inputUsername.current.value;
    const enteredPassword = inputPassword.current.value;
    if (enteredUsername.trim().length === 0) {
      alert("Please enter username.");
      return false;
    }
    if (enteredPassword.trim().length === 0 || enteredPassword.length < 4) {
      alert("Password should not be empty or less than 4 characters.");
      return false;
    }
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("/auth/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const candidate = res.data.find(
        (username) => username.username === enteredUsername
      );
      console.log(candidate);

      if (candidate) {
        userExists = true;
        alert("User already exists. You will be redirected to login page.");
        window.location.href = "/log-in";
        return false;
      }
      await axios.post("/auth/registration", {
        username: enteredUsername,
        password: enteredPassword,
      });
      const loginData = {
        username: enteredUsername,
        password: enteredPassword,
      };
      const loginRes = await axios.post("/auth/login", loginData);
      localStorage.setItem("token", loginRes.data.token);
      localStorage.setItem("currentUser", JSON.stringify(loginRes.data.user));
      window.location.href = "/";
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <p>
          Already have an account? <Link to="/login">Log In</Link>
        </p>
        <div className="formItem">
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            className="form-control"
            placeholder="your-email@gmail.com"
            ref={inputUsername}
          />
        </div>
        <div className="formItem">
          <label htmlFor="password">Password</label>
          <input
            className="form-control"
            type="password"
            placeholder="password123"
            ref={inputPassword}
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
    </Card>
  );
}
