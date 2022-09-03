import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";
import axios from "../plugins/axios";
import User from "../components/User";
import Collection from "../components/Collection";
import Loader from "../components/UI/Loader";

export default function ProfilePage() {
  const [collections, setCollections] = useState([]);
  let refreshRate = 0;
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  setInterval(function () {
    refreshRate++;
  }, 5000);

  useEffect(() => {
    async function fetchCollections() {
      const res = await axios.get(`collection/user/${currentUser._id}`);
      console.log(res.data);
      setCollections(res.data);
    }
    fetchCollections();
    // eslint-disable-next-line
  }, [refreshRate]);
  return (
    <>
      <div>
        <Link to="" className="link-back" onClick={() => navigate(-1)}>
          <FontAwesomeIcon icon={faLeftLong} /> Go Back
        </Link>
        <User username={currentUser.username} />
      </div>
      <h2 className="page-title">Collections</h2>
      {collections.length === 0 ? <Loader /> : null}
      {collections.map((col) => (
        <Collection collection={col} key={col._id} />
      ))}
    </>
  );
}
