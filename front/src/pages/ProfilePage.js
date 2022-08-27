import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../plugins/axios";
import User from "../components/User";
import Collection from "../components/Collection";
import Loader from '../components/UI/Loader'


export default function ProfilePage() {
  const [collections, setCollections] = useState([]);
  let refreshRate = 0;
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  console.log(currentUser.username);

  setInterval(function () {
    refreshRate++;
  }, 5000);

  useEffect(() => {
    async function fetchCollections() {
      const res = await axios.get(
        `collection/?username=${currentUser.username}`
      );
      console.log(res.data);
      setCollections(res.data);
    }
    fetchCollections();
    // eslint-disable-next-line
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
      {collections.length === 0 ? (
        <Loader />
      ) : null}
      {collections.map((col) => (
        <Collection collection={col} key={col._id} />
      ))}
    </>
  );
}
