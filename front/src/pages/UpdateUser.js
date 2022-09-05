import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import BaseCard from "../components/UI/BaseCard";
import Loader from "../components/UI/Loader";
import axios from "../plugins/axios";
import { useEffect } from "react";

export default function UpdateUser(props) {
  const { t } = useTranslation();
  const [user, setUser] = useState({});
  const [useExists, setUserExists] = useState(false);
  const [statusLoading, setStatusLoading] = useState(false);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let { id } = useParams();

  useEffect(() => {
    async function getUser() {
      const res = await axios.get(`user/${id}`);
      setUser(res.data);
      setName(res.data.name);
      setLastName(res.data.lastName);
      setUsername(res.data.username);
      setEmail(res.data.email);
      setPassword(res.data.password);
    }
    getUser();
  }, []);
  async function handleUpdate(e) {
    e.preventDefault();

    if (username.trim().length === 0) {
      alert(t("login-username-validation"));
      return false;
    }
    if (password.trim().length === 0 || password.length < 4) {
      alert(t("login-password-validation"));
      return false;
    }
    // check if user exists
    const res = await axios.get("user");
    const candidate = res.data.find((name) => name.username === username);
    console.log(candidate);
    if (candidate) {
      setUserExists(true);
      alert(t("signup-user-exists"));
      window.location.href("/login");
    }
    const userData = {
      username: username,
      name: name,
      lastName: lastName,
      password: password,
      email: email,
    };
    try {
      await axios.put(`user/update/${currentUser.id}`, userData);
      if (res.status === 200) {
        setStatusLoading(false);
      }
    } catch (err) {
      alert("Failed to update user");
      console.log(err);
    }
  }
  return (
    <BaseCard>
      <form onSubmit={handleUpdate}>
        <h2>{t("edit-user")}</h2>

        <div className="formItem">
          <label htmlFor="name">{t("signup-name")}</label>
          <input
            type="test"
            className="form-control input"
            placeholder="John"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="formItem">
          <label htmlFor="lastName">{t("signup-lastname")}</label>
          <input
            type="test"
            className="form-control input"
            placeholder="Jefferson"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div className="formItem">
          <label htmlFor="username">{t("signup-username")}</label>
          <input
            type="text"
            className="form-control input"
            placeholder="@username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="formItem">
          <label htmlFor="email">{t("signup-email")}</label>
          <input
            type="email"
            className="form-control input"
            placeholder="your-email@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <button className="btn btn-success">{t("signup-submit")}</button>
        </div>
      </form>
      {useExists ? (
        <div>
          <p>{t("signup-redirect")}</p>
        </div>
      ) : null}
    </BaseCard>
  );
}
