import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "../../plugins/axios";
import BaseCard from "../UI/BaseCard";
import CollectionControls from "./CollectionControls";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

export default function Collection(props) {
  const { t } = useTranslation();
  const [length, setLength] = useState(0);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const getCollectionsLength = async () => {
    const res = await axios.get(`collection/length/${props.collection._id}`);
    setLength(res.data);
  };
  useEffect(() => {
    getCollectionsLength();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <BaseCard>
        {props.collection.username === currentUser.username ||
        currentUser.role === "admin" ? (
          <div className="d-flex justify-content-between">
            <h3>{props.collection.title}</h3>
            <CollectionControls collection={props.collection} />
          </div>
        ) : (
          <h3>{props.collection.title}</h3>
        )}
        <Link to={`/user/${props.collection.username}`}>
          @{props.collection.username}
        </Link>
        <br />
        <p>
          {t("col-description")}:{" "}
          {props.collection.description === ""
            ? "No description."
            : props.collection.description}
        </p>
        <p>
          {t("col-num-items")}: {length} {t("col-items")}
        </p>
        <Link
          to={`/collection/items/${props.collection._id}`}
          className="btn btn-secondary mt-3"
        >
          {t("col-item-list")}
        </Link>
      </BaseCard>
    </>
  );
}
