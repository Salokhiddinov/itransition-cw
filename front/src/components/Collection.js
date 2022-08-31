import { Link } from "react-router-dom";
import BaseCard from "./UI/BaseCard";

export default function Collection(props) {
  return (
    <>
      <BaseCard>
        <h3>{props.collection.title}</h3>
        <Link to="/">
          @{props.collection.username}
        </Link>
        <br />
        <p>Description: {props.collection.description}</p>
        {/* <p>Number of Items: {props.collection.items.length} items</p> */}
        <p>Number of Items: {props.numOfItems} items</p>
        <div className="action">
          <Link
            to={`/collection/${props.collection._id}`}
            className="btn btn-secondary"
          >
            Items List
          </Link>
          <button className="btn btn-danger">Delete</button>
        </div>
        <Link
          to={`/user/${props.collection.username}/${props.collection._id}/create`}
          className="btn btn-primary"
        >
          Add Item
        </Link>
      </BaseCard>
    </>
  );
}
