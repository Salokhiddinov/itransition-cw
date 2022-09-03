import Dropdown from "react-bootstrap/Dropdown";
import axios from "../../plugins/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical, faStar } from "@fortawesome/free-solid-svg-icons";

export default function UserControls(props) {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  //   async function deleteCollection() {
  //     let confirmDelete = window.confirm(
  //       `Delete collection "${props.collection.title}"?`
  //     );
  //     if (confirmDelete) {
  //       axios.delete(`delete/collection/${props.collection._id}`);
  //       window.location.reload();
  //     } else {
  //       return false;
  //     }
  //   }
  function refresh() {
    props.onReload();
  }
  async function toggleStatus(status) {
    props.onStatusLoaderOn();
    await axios
      .put(`user/${props.user._id}/change-status`, { role: status })
      .then(() => {
        refresh();
        props.onStatusLoaderOff();
      });
    const user = await axios.get(
      `user/${localStorage.getItem("currentUser").username}`
    );
    localStorage.setItem("user", JSON.stringify(user.data));

    // window.location.reload();
  }

  return (
    <Dropdown>
      <Dropdown.Toggle
        variant="success"
        id="dropdown-basic"
        className="dropdown__toggle mb-3 flex-end"
      >
        <FontAwesomeIcon icon={faEllipsisVertical} />
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item>Edit</Dropdown.Item>
        {currentUser.role === "admin" && props.user.role === "user" && (
          <Dropdown.Item
            onClick={() => {
              toggleStatus("admin");
            }}
          >
            Make Admin <FontAwesomeIcon icon={faStar} />
          </Dropdown.Item>
        )}
        {currentUser.role === "admin" && props.user.role === "admin" && (
          <Dropdown.Item
            onClick={() => {
              toggleStatus("user");
            }}
          >
            Remove Admin Status
            <FontAwesomeIcon icon={faStar} />
          </Dropdown.Item>
        )}

        <Dropdown.Item className="delete-control">Delete</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
