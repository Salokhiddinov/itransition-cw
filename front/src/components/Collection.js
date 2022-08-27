import { useState } from "react";
import { Link } from "react-router-dom";
import BaseCard from "./UI/BaseCard";
import Modal from "./UI/Modal";
import Backdrop from "./UI/Backdrop"

export default function Collection(props) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  function openModal() {
    setModalIsOpen(true);
  }
  function hideModal() {
    setModalIsOpen(false);
  }

  return (
    <>
      {modalIsOpen ? <Modal onCancel={hideModal} onConfirm={null} /> : null}
      {modalIsOpen ? <Backdrop onCancel={hideModal} /> : null}
      <BaseCard>
        <h3>{props.collection.title}</h3>
        <Link to="/">
          <strong>@{props.collection.username}</strong>
        </Link>
        <br />
        <p>Description: {props.collection.description}</p>
        {/* <p>Number of Items: {props.collection.items.length} items</p> */}
        <p>Number of Items: 15 items</p>
        <div className="action">
          <Link to="/" className="btn btn-secondary">
            Open Items List
          </Link>
          <button className="btn btn-danger">Delete</button>
        </div>
        {/* <Link
          to={`/item/create/${props.collection.username}`}
          className="btn btn-primary"
        >
          Add Item ➕
        </Link> */}
        <button className="btn btn-primary" onClick={openModal}>New Item</button>
      </BaseCard>
    </>
  );
}
