import BaseCard from "./UI/BaseCard";
import { Link } from "react-router-dom";

export default function User(props) {
  return (
    <>
      <BaseCard>
        <table className="table table-striped">
          <tbody>
            <tr>
              <td>Name: </td>
              <td>{props.user.name}</td>
            </tr>
            <tr>
              <td>Last name: </td>
              <td>{props.user.lastName}</td>
            </tr>
            <tr>
              <td>Username: </td>
              <td>@{props.user.username}</td>
            </tr>
            <tr>
              <td>Email: </td>
              <td>{props.user.username}</td>
            </tr>
            <tr>
              <td>Status: </td>
              <td>{props.user.role}</td>
            </tr>
          </tbody>
        </table>
        <div className="action ">
          <Link to="/edit-profile" className="btn btn-primary">
            Edit Profile
          </Link>
          <button className="btn btn-danger">Delete Account</button>
        </div>
        <div className="action">
          <Link to="/">New Collection</Link>
        </div>
      </BaseCard>
    </>
  );
}
