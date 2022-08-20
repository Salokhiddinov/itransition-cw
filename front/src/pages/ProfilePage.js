import BaseCard from "../components/UI/BaseCard";
import { Link } from "react-router-dom";
// import { useRef } from "react";
export default function ProfilePage() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  return (
    <div>
      <Link to="/">Back to Home</Link>
      <h2>Profile</h2>
      <BaseCard>
        <table className="table table-striped">
          <tbody>
            <tr>
              <td>Name: </td>
              <td>{currentUser.name}</td>
            </tr>
            <tr>
              <td>Last name: </td>
              <td>{currentUser.lastName}</td>
            </tr>
            <tr>
              <td>Last name: </td>
              <td>{currentUser.lastName}</td>
            </tr>
            <tr>
              <td>Email: </td>
              <td>{currentUser.username}</td>
            </tr>
          </tbody>
        </table>
        <Link to="/edit-profile">Edit Profile</Link>
        <button>Delete Account</button>
      </BaseCard>
    </div>
  );
}
