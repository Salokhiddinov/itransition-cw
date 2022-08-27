import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../plugins/axios";
import User from "../components/User";
import Collection from "../components/Collection";

export default function ProfilePage() {
  const [collections, setCollections] = useState([]);
  let refreshRate = 0;
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  console.log(currentUser._id);

  setInterval(function () {
    refreshRate++;
    console.log(refreshRate);
  }, 2000);

  useEffect(() => {
    async function fetchCollections() {
      const res = await axios.get(`collection/${currentUser.username}`);
      console.log(res);
      setCollections(res);
    }
    fetchCollections();
  }, [refreshRate]);

  return (
    <>
      <div>
        <button className="btn btn-secondary" onClick={() => navigate(-1)}>
          👈 Go Back
        </button>
        <h2 className="page-title">Profile</h2>
        <User user={currentUser} />
      </div>
      <h2 className="page-title">Collections</h2>
      {collections.map((col) => (
        <Collection collection={col} key={col._id} />
      ))}
    </>
  );
}
